import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqaGUgps83RS8e_Bm-bDQQ1CdEtoibHdo",
  authDomain: "rtcweb-7252a.firebaseapp.com",
  databaseURL: "https://rtcweb-7252a-default-rtdb.firebaseio.com",
  projectId: "rtcweb-7252a",
  storageBucket: "rtcweb-7252a.appspot.com",
  messagingSenderId: "248394423537",
  appId: "1:248394423537:web:9a9829a9ba309963959d50"
};

export const db = initializeApp(firebaseConfig);