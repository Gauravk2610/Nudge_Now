import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clientId: null,
    token: null,
    nudgeUserId: null,
    // expires_in: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { clientId, token } = action.payload;
        state.clientId = clientId;
        state.token = token;
        // state.expires_in = expires_in;
    },
    setNudgeId: (state, action) => {
      const {nudgeUserId} = action.payload
      state.nudgeUserId = nudgeUserId
    }
  },
});

export const selectAuth = (state) => state.auth;

// Action creators are generated for each case reducer function
export const { setAuth, setNudgeId } = authSlice.actions;

export default authSlice.reducer;
