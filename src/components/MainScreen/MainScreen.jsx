import React from "react";

const MainScreen = () => {
  const configuration = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

    let peerConnection = null;
    let localStream = null;
    let remoteStream = null;
    let roomDialog = null;
    let roomId = null;

    const openUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
        });
        document.querySelector("#localVideo").srcObject = stream;
        localStream = stream;
        remoteStream = new MediaStream();
        document.querySelector("#remoteVideo").srcObject = remoteStream;
    };

    return (
        <>
            <button
                className="mdc-button mdc-button--raised"
                id="cameraBtn"
                onClick={() => openUserMedia()}
            >
                <span className="mdc-button__label">Open camera & microphone</span>
            </button>
            <div id="videos">
                <video id="localVideo" muted autoPlay playsInline></video>
                {/* <video id="remoteVideo" autoplay playsinline></video> */}
            </div>
        </>
    );
};

export default MainScreen;
