import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { context } from "../../context/contextProvider";

const MainScreen = () => {
  const { openUserMedia, createRoom } = useContext(context);
  const remoteVideo = useRef(null);
  const localVideo = useRef(null);
  return (
    <>
      <button
        className="mdc-button mdc-button--raised"
        id="cameraBtn"
        onClick={() => openUserMedia(localVideo, remoteVideo)}
      >
        <span className="mdc-button__label">Open camera & microphone</span>
      </button>
      <button onClick={() => createRoom()}>Create Room</button>
      <div id="videos">
        <video
          id="localVideo"
          muted
          autoPlay
          playsInline
          ref={localVideo}
        ></video>
        <video id="remoteVideo" autoPlay playsInline ref={remoteVideo}></video>
      </div>
    </>
  );
};

export default MainScreen;
