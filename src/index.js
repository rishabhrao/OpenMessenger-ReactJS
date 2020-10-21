/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Chat from "./Chat";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<Router>
				<Switch>
					<Route path="/" component={App} exact />
					<Route path="/:chatid" component={Chat} />
				</Switch>
			</Router>
		</StateProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
