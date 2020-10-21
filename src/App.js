/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import Login from "./Login";
import Header from "./Header";
import Chats from "./Chats";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { Button, FormControl, Input } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import validator from "email-syntax-validator";

function App() {
	const getModalStyle = () => {
		const top = 50 + Math.round(Math.random() * 20) - 10;
		const left = 50 + Math.round(Math.random() * 20) - 10;

		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		};
	};

	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			display: "grid",
			placeContent: "center",
			width: "60vw",
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	}));

	const history = useHistory();

	const [{ username, useremail }, dispatch] = useStateValue();

	const [newEmail, setNewEmail] = useState("");
	const [newName, setNewName] = useState("");

	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const startNewChat = (event) => {
		event.preventDefault();

		const valid = validator.validate(newEmail);

		if (valid) {
			if (newEmail > useremail) {
				var user1email = newEmail;
				var user1name = newName;
				var user2email = useremail;
				var user2name = username;
			} else {
				var user1email = useremail;
				var user1name = username;
				var user2email = newEmail;
				var user2name = newName;
			}

			var chatid = user1email + user2email;

			//Write New Chatroom to Firestore Database
			db.collection("chatrooms").doc(chatid).set({
				user1email: user1email,
				user1name: user1name,
				user2email: user2email,
				user2name: user2name,
			});
			setNewName("");
			setNewEmail("");

			history.push(`/${chatid}`);
		} else {
			alert("Invalid Email Address.");
		}
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">
				Please enter details of the person you want to Chat with:
			</h2>
			<form className="newform">
				<Input
					autoFocus
					type="email"
					value={newEmail}
					onChange={(e) => setNewEmail(e.target.value)}
					id="standard-basic"
					className="text"
					placeholder="email"
				/>
				<Input
					value={newName}
					type="text"
					onChange={(e) => setNewName(e.target.value)}
					id="standard-basic"
					className="text"
					placeholder="name"
				/>
				<Button
					variant="contained"
					color="primary"
					disabled={newEmail.length === 0 || newName.length === 0}
					onClick={startNewChat}
					type="submit"
				>
					Start Chat
				</Button>
			</form>
		</div>
	);

	const [input, setInput] = useState("");
	const [chatrooms, setChatrooms] = useState([]);

	//Read Chatrooms from Firestore Database
	useEffect(() => {
		db.collection("chatrooms").onSnapshot((snapshot) => {
			setChatrooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					user1email: doc.data().user1email,
					user1name: doc.data().user1name,
					user2email: doc.data().user2email,
					user2name: doc.data().user2name,
				})),
			);
		});
	}, []);

	return (
		<div className="App">
			{!useremail ? (
				<Login />
			) : (
				<>
					<Header />

					{chatrooms.every(
						(chat, i) => chatrooms[i].user1email !== useremail,
					) &&
					chatrooms.every(
						(chat, i) => chatrooms[i].user2email !== useremail,
					) ? (
						<h1>
							You don't have any chats. Please Click on the New
							Chat Button below to start a conversation.
						</h1>
					) : (
						<div className="chats__container">
							{chatrooms.map(
								({
									id,
									user1email,
									user1name,
									user2email,
									user2name,
								}) => {
									if (
										user1email == useremail ||
										user2email == useremail
									) {
										return (
											<Chats
												key={id}
												id={id}
												name={
													user1email === useremail
														? user2name
														: user1name
												}
												email={
													user1email === useremail
														? user2email
														: user1email
												}
											/>
										);
									}
								},
							)}
						</div>
					)}
					<div className="fab" onClick={handleOpen}>
						<Fab
							color="primary"
							aria-label="add"
							variant="extended"
						>
							<AddIcon /> New Chat
						</Fab>
					</div>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
					>
						{body}
					</Modal>
				</>
			)}
		</div>
	);
}

export default App;
