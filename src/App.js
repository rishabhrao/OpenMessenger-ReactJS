/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React, { useState, useEffect, useRef } from "react";
import { FormControl, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import Login from "./Login";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "", useremail: "", message: "" },
  ]);
  const [{ username, useremail }, dispatch] = useStateValue();

  //Read Messages from Firestore Database
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    //Write Messages to Firestore Database
    db.collection("messages").add({
      message: input,
      username: username,
      useremail: useremail,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="App">
      {!useremail ? (
        <Login />
      ) : (
        <>
          <div className="greeting">
            <h2>
              Hello {username} ({useremail}) 💝{" "}
            </h2>
            <h2>Welcome to Open Messenger!!!</h2>
          </div>

          <div className="form_container">
            <form className="app__form">
              <FormControl className="app__formControl">
                <Input
                  autoFocus
                  className="app__input"
                  placeholder="Enter Message..."
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <IconButton
                  className="app__iconButton"
                  disabled={!input.replace(/\s/g, "").length}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={sendMessage}
                >
                  <SendIcon />
                </IconButton>
              </FormControl>
            </form>
          </div>

          <div className="messages__container">
            {messages.map(({ id, message }) => (
              <Message
                key={id}
                username={username}
                useremail={useremail}
                message={message}
              />
            ))}
          </div>
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default App;
