// toggleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
	isToggled: boolean;
}

const initialState: ToggleState = {
	isToggled: false,
};

const toggleSlice = createSlice({
	name: "toggle",
	initialState,
	reducers: {
		toggle: (state) => {
			state.isToggled = !state.isToggled;
		},
	},
});

export const { toggle } = toggleSlice.actions;
export const { reducer } = toggleSlice;
