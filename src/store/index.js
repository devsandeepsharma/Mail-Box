import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import emailSlice from "./emailSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        emails: emailSlice,
    }
})

export default store;