/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FormControl, Input } from "@material-ui/core";
import "./Chat.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import Login from "./Login";
import Header from "./Header";

function Chat() {
	const { chatid } = useParams();

	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([
		{ username: "", useremail: "", message: { "": "" } },
	]);
	const [{ username, useremail }, dispatch] = useStateValue();

	//Read Messages from Firestore Database
	useEffect(() => {
		db.collection("chatrooms")
			.doc(chatid)
			.collection("chats")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						message: doc.data(),
					})),
				);
			});
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		//Write Messages to Firestore Database
		db.collection("chatrooms").doc(chatid).collection("chats").add({
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
		<div className="Chat">
			{!useremail ? (
				<Login />
			) : (
				<>
					<Header />
					<div className="form_container">
						<form className="chat__form">
							<FormControl className="chat__formControl">
								<Input
									autoFocus
									className="chat__input"
									placeholder="Enter Message..."
									value={input}
									onChange={(event) =>
										setInput(event.target.value)
									}
								/>
								<IconButton
									className="chat__iconButton"
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

export default Chat;
