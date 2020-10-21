/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

export const initialState = {
	username: JSON.parse(localStorage.getItem("username")) || null,
	useremail: JSON.parse(localStorage.getItem("useremail")) || null,
};

export const actionTypes = {
	SET_USER: "SET_USER",
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			if (typeof window !== "undefined") {
				localStorage.setItem(
					"username",
					JSON.stringify(action.username),
				);
				localStorage.setItem(
					"useremail",
					JSON.stringify(action.useremail),
				);
			}
			return {
				...state,
				username: action.username,
				useremail: action.useremail,
			};

		// return {
		// 	...state,
		// 	username: action.username,
		// 	useremail: action.useremail,
		// };
		default:
			return state;
	}
};

export default reducer;
