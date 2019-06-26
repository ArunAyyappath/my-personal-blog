import firebase from "firebase/app";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBdEEbjWwIwTgIyWuxzZirFGuilSPeZPCg",
  authDomain: "current-blog.firebaseapp.com",
  databaseURL: "https://current-blog.firebaseio.com",
  projectId: "current-blog",
  storageBucket: "",
  messagingSenderId: "382785953359",
  appId: "1:382785953359:web:324e3d3789d22eef"
});

export default app;
