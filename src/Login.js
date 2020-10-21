/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React from "react";
import "./Login.css";
import GoogleButton from "react-google-button";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
	const [state, dispatch] = useStateValue();

	const signIn = (e) => {
		auth.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					username: result?.user?.displayName,
					useremail: result?.user?.email,
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="login">
			<div className="login__container">
				<img src="Logo.png" alt="Open Messenger Logo" />
				<h2>Open Messenger</h2>
				<br></br>
				<div>
					<GoogleButton onClick={signIn} />
				</div>
			</div>
		</div>
	);
}

export default Login;
