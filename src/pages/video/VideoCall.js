import React, { Component } from "react"
import _ from "lodash"
import socket from "./socket"
import { useParams, useHistory } from "react-router-dom"
import PeerConnection from "./PeerConnection"
import MainWindow from "./MainWindow"
import CallWindow from "./CallWindow"
import CallModal from "./CallModal"
import { useSelector } from "react-redux"
import NavbarLayout from "../../components/layout/NavbarLayout"
import SimpleLayout from "../../components/layout/SimpleLayout"
import { Box, Typography, Avatar, ButtonBase, Modal } from "@material-ui/core"
import {
  CloseOutlined,
  VideoCall,
  PhoneAndroid,
  PhoneCallback,
  Phone,
} from "@material-ui/icons"
import { fullNameSelector, userIdSelector } from "../../redux/user"

// import "./app.min.css"

function CloseButton({ onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      style={{
        width: 64,
        height: 64,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 64 / 2,
        }}
      >
        <CloseOutlined
          style={{ width: 60, height: 60, color: "#19769F", fontSize: 14 }}
        />
      </div>
    </ButtonBase>
  )
}

function VideoCallButton({ onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      style={{
        width: 64,
        height: 64,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 64 / 2,
        }}
      >
        <VideoCall />
      </div>
    </ButtonBase>
  )
}

function PhoneCallButton({ onClick }) {
  return (
    <ButtonBase onClick={onClick}>
      <div
        style={{
          width: 64,
          height: 64,
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 64 / 2,
        }}
      >
        <Phone />
      </div>
    </ButtonBase>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      clientId: "",
      callWindow: "",
      callModal: "",
      callFrom: "",
      callFromName: "",
      localSrc: null,
      peerSrc: null,
      isOffered: false,
    }
    this.pc = {}
    this.config = null
    this.startCallHandler = this.startCall.bind(this)
    this.endCallHandler = this.endCall.bind(this)
    this.rejectCallHandler = this.rejectCall.bind(this)
  }

  componentDidMount() {
    const { userId, userName } = this.props

    socket
      .on("init", ({ userId: clientId }) => {
        console.log("client init", clientId)
        // document.title = `${clientId} - VideoCall`
        this.setState({ clientId })
      })
      .on("request", ({ from: callFrom, fromName: callFromName }) => {
        this.setState({ callModal: "active", callFrom, callFromName })
      })
      .on("call", (data) => {
        if (data.sdp) {
          if (this.pc.setRemoteDescription) {
            this.pc.setRemoteDescription(data.sdp)
          }
          if (data.sdp.type === "offer" && this.pc.createAnswer) {
            this.pc.createAnswer()
          }
        } else {
          if (this.pc.addIceCandidate) {
            this.pc.addIceCandidate(data.candidate)
          }
        }
      })
      .on("end", this.endCall.bind(this, false))
      // .emit("init")
      .emit("init", {
        userId,
        userName,
      })
  }

  startCall(isCaller, friendID, config) {
    this.config = config
    this.pc = new PeerConnection(friendID)
      .on("localStream", (src) => {
        const newState = { callWindow: "active", localSrc: src }
        if (!isCaller) newState.callModal = ""
        this.setState(newState)
      })
      .on("peerStream", (src) =>
        this.setState({ peerSrc: src, isOffered: true })
      )
      .start(isCaller, config)
  }

  rejectCall() {
    const { callFrom } = this.state
    socket.emit("end", { to: callFrom })
    this.setState({ callModal: "" })
  }

  endCall(isStarter) {
    if (_.isFunction(this.pc.stop)) {
      this.pc.stop(isStarter)
    }
    this.pc = {}
    this.config = null
    this.setState({
      callWindow: "",
      callModal: "",
      friendID: "",
      callFromName: "",
      localSrc: null,
      peerSrc: null,
      isOffered: false,
    })
  }

  render() {
    const {
      clientId,
      callFrom,
      callModal,
      callWindow,
      localSrc,
      peerSrc,
      callFromName,
      // friendID,
    } = this.state

    const { friendID, friendName } = this.props

    const callWithVideo = (video) => {
      const config = { audio: true, video }
      return () => friendID && this.startCallHandler(true, friendID, config)
    }

    const newUI = (
      <Box
        display="flex"
        style={{
          backgroundImage: "linear-gradient(to bottom, #FF2A2A , #FF5D2A)",
          zIndex: 999999999,
        }}
        height="100%"
      >
        <NavbarLayout disabledShadow>
          <div>
            <Box>
              {callWindow === "active" && (
                <Typography
                  variant="h6"
                  style={{ color: "#ffffff", textAlign: "center" }}
                >
                  VDO Calling.....
                </Typography>
              )}
              <Typography
                variant="h5"
                style={{ color: "#ffffff", textAlign: "center", marginTop: 10 }}
              >
                {friendName}
              </Typography>
            </Box>
            <Box
              marginTop={5}
              style={{
                width: 165.53,
                height: 165.53,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "50%",
                  marginRight: -(165.53 / 2),
                }}
              >
                <Avatar
                  style={{
                    width: 165.53,
                    height: 165.53,
                  }}
                ></Avatar>
              </div>
            </Box>
            <Box
              marginTop={20}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {callWindow === "active" ? (
                <CloseButton onClick={() => this.endCallHandler(true)} />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <VideoCallButton onClick={callWithVideo(true)} />
                  <PhoneCallButton onClick={callWithVideo(false)} />
                </div>
              )}
            </Box>
            <Box
              marginTop={5}
              style={{
                height: 165.53,
              }}
            >
              {/* <Typography
                variant="h6"
                style={{ color: "#ffffff", textAlign: "center" }}
              >
                {clientId}
              </Typography> */}
            </Box>
            <Box
              marginTop={5}
              style={{
                height: 165.53,
              }}
            ></Box>
          </div>
        </NavbarLayout>
        <Modal
          open={!_.isEmpty(this.config)}
          open={this.state.isOffered}
          onClose={() => this.endCallHandler(true)}
        >
          <CallWindow
            status={callWindow}
            localSrc={localSrc}
            peerSrc={peerSrc}
            config={this.config}
            mediaDevice={this.pc.mediaDevice}
            endCall={this.endCallHandler}
          />
        </Modal>
        <Modal open={callModal} onClose={this.rejectCallHandler}>
          <CallModal
            status={callModal}
            startCall={this.startCallHandler}
            rejectCall={this.rejectCallHandler}
            callFrom={callFrom}
            callFromName={callFromName}
          />
        </Modal>
      </Box>
    )

    return newUI
  }
}

function WrappingVideoCall() {
  const { friendID, friendName } = useParams()

  const userId = useSelector(userIdSelector)
  const userName = useSelector(fullNameSelector)

  return (
    <App
      userId={userId}
      userName={userName}
      friendID={friendID}
      friendName={friendName}
    />
  )
}

export default WrappingVideoCall
