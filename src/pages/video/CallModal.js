import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { Box, Typography, Avatar, ButtonBase, Modal } from "@material-ui/core"
import {
  CloseOutlined,
  VideoCall,
  MissedVideoCall,
  PhoneAndroid,
  PhoneCallback,
  Phone,
  CallEnd,
  Mic,
  MicNone,
  MicOff,
  VideocamOff,
} from "@material-ui/icons"

function VideoCallButton({ onClick, on }) {
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
          backgroundColor: on ? "#22B573" : "#FF0000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 64 / 2,
        }}
      >
        {on ? (
          <VideoCall style={{ color: "#ffffff" }} />
        ) : (
          <VideocamOff style={{ color: "#ffffff" }} />
        )}
      </div>
    </ButtonBase>
  )
}

function HangUpButton({ onClick }) {
  return (
    <ButtonBase onClick={onClick}>
      <div
        style={{
          width: 64,
          height: 64,
          backgroundColor: "#FF0000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 64 / 2,
        }}
      >
        <CallEnd style={{ color: "#ffffff" }} />
      </div>
    </ButtonBase>
  )
}

function MicButton({ onClick, on }) {
  return (
    <ButtonBase onClick={onClick}>
      <div
        style={{
          width: 64,
          height: 64,
          backgroundColor: on ? "#22B573" : "#FF0000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 64 / 2,
        }}
      >
        {on ? (
          <Mic style={{ color: "#ffffff" }} />
        ) : (
          <MicOff style={{ color: "#ffffff" }} />
        )}
      </div>
    </ButtonBase>
  )
}

function CallModal({ status, callFrom, startCall, rejectCall, callFromName }) {
  const acceptWithVideo = (video) => {
    const config = { audio: true, video }
    return () => startCall(false, callFrom, config)
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Typography
        variant="h5"
        style={{ color: "#ffffff", textAlign: "center", marginBottom: 200 }}
      >
        {`${callFromName} is calling`}
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignSelf: "center",
        }}
      >
        <MicButton on onClick={acceptWithVideo(false)} />
        <HangUpButton onClick={rejectCall} />
        <VideoCallButton on onClick={acceptWithVideo(true)} />
      </div>
    </div>
  )
}

CallModal.propTypes = {
  status: PropTypes.string.isRequired,
  callFrom: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  rejectCall: PropTypes.func.isRequired,
}

export default CallModal
