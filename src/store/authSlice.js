import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticate: false,
    user: null,
    initialized: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login (state, action) {
            state.authenticate = true;
            state.user = action.payload;
            state.initialized = true
        },
        logout (state) {
            state.authenticate = false;
            state.user = null;
            state.initialized = true
        },
        updateUser (state, action) {
            state.user = action.payload
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;