import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDataProps } from "../../types/auth/UserData";
import * as api from "./authService";
import { RootState } from "../../redux/store";

interface authState {
  status: "idle" | "loading" | "success" | "failure";
  user: UserDataProps;
  refreshToken: string | null;
  accessToken: string | null;
}

const initialState: authState = {
  status: "idle",
  user: {
    objectId: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    passcode: "",
    password: "",
    role: "",
  },
  refreshToken: null,
  accessToken: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: UserDataProps, { rejectWithValue }) => {
    try {
      return await api.registerUser(userData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: UserDataProps, { rejectWithValue }) => {
    try {
      return await api.loginUser(userData);
    } catch (error: any) {
      return rejectWithValue(error.message || "login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        // if (action.payload) {
        //   state.user = action.payload;
        // }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const {} = authSlice.actions;
export default authSlice.reducer;
