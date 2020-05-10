import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
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
import classnames from "classnames"

const getButtonClass = (icon, enabled) =>
  classnames(`btn-action fa ${icon}`, { disable: !enabled })

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

function CallWindow({
  peerSrc,
  localSrc,
  config,
  mediaDevice,
  status,
  endCall,
}) {
  const peerVideo = useRef(null)
  const localVideo = useRef(null)
  const [video, setVideo] = useState(config?.video)
  const [audio, setAudio] = useState(config?.audio)

  useEffect(() => {
    if (peerVideo.current && peerSrc) peerVideo.current.srcObject = peerSrc
    if (localVideo.current && localSrc) localVideo.current.srcObject = localSrc
  })

  useEffect(() => {
    if (mediaDevice) {
      mediaDevice.toggle("Video", video)
      mediaDevice.toggle("Audio", audio)
    }
  })

  /**
   * Turn on/off a media device
   * @param {String} deviceType - Type of the device eg: Video, Audio
   */
  const toggleMediaDevice = (deviceType) => {
    if (deviceType === "video") {
      setVideo(!video)
      mediaDevice.toggle("Video")
    }
    if (deviceType === "audio") {
      setAudio(!audio)
      mediaDevice.toggle("Audio")
    }
  }

  return (
    <div
      className={classnames("call-window", status)}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <video
        id="peerVideo"
        ref={peerVideo}
        autoPlay
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 50,
          display: "flex",
          flexDirection: "column",
          // height: 126 + (55 + 32),
        }}
      >
        <video
          id="localVideo"
          ref={localVideo}
          autoPlay
          muted
          style={{
            height: 144,
            width: 126,
            backgroundColor: "gray",
            margin: 30,
            display: "flex",
            alignSelf: "flex-end",
          }}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignSelf: "center",
          }}
        >
          <MicButton on={audio} onClick={() => toggleMediaDevice("audio")} />
          <HangUpButton onClick={() => endCall(true)} />
          <VideoCallButton
            on={video}
            onClick={() => toggleMediaDevice("video")}
          />
        </div>
      </div>
    </div>
  )
}

CallWindow.propTypes = {
  status: PropTypes.string.isRequired,
  localSrc: PropTypes.object, // eslint-disable-line
  peerSrc: PropTypes.object, // eslint-disable-line
  config: PropTypes.shape({
    audio: PropTypes.bool.isRequired,
    video: PropTypes.bool.isRequired,
  }).isRequired,
  mediaDevice: PropTypes.object, // eslint-disable-line
  endCall: PropTypes.func.isRequired,
}

export default CallWindow
