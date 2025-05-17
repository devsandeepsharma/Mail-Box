import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticate: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login (state, action) {
            state.authenticate = true;
            state.user = action.payload;
        },
        logout (state) {
            state.authenticate = false;
            state.user = null;
        },
        updateUser (state, action) {
            state.user = action.payload
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;