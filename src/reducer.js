/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

export const initialState = {
  // username: "null",
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        username: action.username,
        useremail: action.useremail,
      };
    default:
      return state;
  }
};

export default reducer;
