import React, { createContext } from "react";
import { db } from "../config/firebase";
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
    localVideo.current.srcObject = stream;
    localStream = stream;
    remoteStream = new MediaStream();
    remoteVideo.current.srcObject = remoteStream;
  };

  const createRoom = async () => {
    peerConnection = new RTCPeerConnection(configuration);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    };
    const roomRef = await db.collection("rooms").add(roomWithOffer);
    const roomId = roomRef.id;
    roomRef.onSnapshot(async (snapshot) => {
      console.log("Got updated room:", snapshot.data());
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data.answer) {
        console.log("Set remote description: ", data.answer);
        const answer = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(answer);
      }
    });

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.addEventListener("track", (event) => {
      console.log("Got remote track:", event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        console.log("Add a track to the remoteStream:", track);
        remoteStream.addTrack(track);
      });
    });
  };

  return (
    <context.Provider
      value={{
        openUserMedia: openUserMedia,
        createRoom: createRoom,
      }}
    >
      {props.children}
    </context.Provider>
  );
};
