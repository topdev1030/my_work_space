import { configureStore } from "@reduxjs/toolkit";

// reducers
import { reducer as AuthReducer } from "./auth";
import { reducer as toggleReducer } from "./toggleTheme";

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		toggle: toggleReducer,
	},
});
