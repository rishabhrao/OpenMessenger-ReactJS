/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import { actionTypes } from "./reducer";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

function Header() {
	const [{ username, useremail }, dispatch] = useStateValue();

	const signOut = () => {
		if (useremail) {
			auth.signOut();
			dispatch({
				type: actionTypes.SET_USER,
				username: null,
				useremail: null,
			});
		}
	};

	return (
		<div className="header">
			<div>
				<Link to="/">
					<div>
						<img src="Logo.png" alt="Open Messenger Logo" />
					</div>
				</Link>
			</div>
			<div className="header__right">
				<h4>
					{username} ({useremail})
				</h4>
				<Button variant="contained" color="primary" onClick={signOut}>
					Sign Out
				</Button>
			</div>
		</div>
	);
}

export default Header;
