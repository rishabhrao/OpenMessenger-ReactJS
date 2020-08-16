import React, { useState, useEffect, useRef } from "react";
import { FormControl, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ username: "", message: "" }]);
  const [username, setUsername] = useState("");

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

  useEffect(() => {
    setUsername(prompt("Please Enter your Name"));
    // setUsername("Tester");
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    //Write Messages to Firestore Database
    db.collection("messages").add({
      message: input,
      username: username,
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
      <div className="greeting">
        <h2>Hello {username} 💝 </h2>
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

      <div>
        <FlipMove className="messages__container">
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))}
        </FlipMove>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default App;
