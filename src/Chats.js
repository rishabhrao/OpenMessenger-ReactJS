/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import { Button } from "@material-ui/core";
import React from "react";
import "./Chats.css";
import { Link } from "react-router-dom";

function Chats({ id, name, email }) {
	return (
		<Link to={id} className="chats">
			<Button variant="contained" className="button">
				{name} ({email})
			</Button>
		</Link>
	);
}

export default Chats;
