import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataProps } from "../../types/auth/UserData";
import * as api from "./authService";
import { RootState } from "../../redux/store";

interface authState {
  status: "idle" | "loading" | "success" | "failure";
  user: UserDataProps;
  refreshToken: string | null;
  accessToken: string | null;
  sentRecoveryEmail?: boolean;
  passwordIsReset: boolean;
  isEmailVerified: boolean;
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
  sentRecoveryEmail: false,
  passwordIsReset: false,
  isEmailVerified: false,
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

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      return await api.loginWithGoogle();
    } catch (error: any) {
      return rejectWithValue(error.message || "login failed");
    }
  }
);

export const facebookLogin = createAsyncThunk(
  "auth/facebookLogin",
  async (_, { rejectWithValue }) => {
    try {
      return await api.loginWithFacebook();
    } catch (error: any) {
      return rejectWithValue(error.message || "login failed");
    }
  }
);

export const getCuurentLoginUserData = createAsyncThunk(
  "auth/getCuurentLoginUserData",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getCurrentLoginUser();
    } catch (error: any) {
      return rejectWithValue(error.message || "login failed");
    }
  }
);

export const passwordRecoveryLink = createAsyncThunk(
  "auth/passwordRecoveryLink",
  async (email: string, { rejectWithValue }) => {
    try {
      return await api.passwordRecoveryLink(email);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "forgot password linked failed to sent"
      );
    }
  }
);

export const passwordReset = createAsyncThunk(
  "auth/passwordReset",
  async (
    passwordResetData: {
      userId: string;
      secret: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await api.resetPassword(passwordResetData);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to reset password");
    }
  }
);

export const emailVerifing = createAsyncThunk(
  "auth/emailVerify",
  async (
    verifyData: {
      userId: string;
      secret: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await api.createActivateEmailVerification(verifyData);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to verify email");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      return await api.logOut();
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to verify email");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = {
        objectId: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        gender: "",
        passcode: "",
        password: "",
        role: "",
      };
    },
    setRecoveryPasswordLink: (state, action: PayloadAction<boolean>) => {
      state.sentRecoveryEmail = action.payload;
    },
    hidePasswordResetModal: (state, action: PayloadAction<boolean>) => {
      state.passwordIsReset = action.payload;
    },
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
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          // state.user = ;
        }
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(passwordRecoveryLink.pending, (state) => {
        state.status = "loading";
      })
      .addCase(passwordRecoveryLink.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.sentRecoveryEmail = action.payload;
        }
      })
      .addCase(passwordRecoveryLink.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(emailVerifing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emailVerifing.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.isEmailVerified = action.payload;
        }
      })
      .addCase(emailVerifing.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(googleLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleLogin.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(googleLogin.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(facebookLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(facebookLogin.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(facebookLogin.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getCuurentLoginUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCuurentLoginUserData.fulfilled, (state, action) => {
        state.status = "success";
        console.log("loginuser data slice ", action.payload);
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(getCuurentLoginUserData.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(passwordReset.pending, (state) => {
        state.status = "loading";
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.passwordIsReset = action.payload;
        }
      })
      .addCase(passwordReset.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const {
  setRecoveryPasswordLink,
  hidePasswordResetModal,
  resetUserState,
} = authSlice.actions;
export default authSlice.reducer;
