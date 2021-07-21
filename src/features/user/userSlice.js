import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isLoggedin: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signIn: (state, action) => {
			state.user = action.payload;
			state.isLoggedin = true;
		},
		signOut: (state) => {
			state.user = {};
			state.isLoggedin = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { signIn, signOut } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectLogin = (state) => state.user;

export const userID = (state) => state.user.user.uid;

export const checkLogin = (state) => state.user.isLoggedin;

export default userSlice.reducer;
