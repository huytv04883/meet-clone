import React, { createContext } from "react";
export const context = createContext();

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

let peerConnection = null;
let localStream = null;
let remoteStream = null;
let roomDialog = null;
let roomId = null;

export const ContextProvider = (props) => {
  const openUserMedia = async (localVideo, remoteVideo) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = stream;
    localStream = stream;
    remoteStream = new MediaStream();
    remoteVideo.srcObject = remoteStream;
  };

  return (
    <context.Provider value={{ openUserMedia: openUserMedia }}>
      {props.children}
    </context.Provider>
  );
};
