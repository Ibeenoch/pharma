import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataProps } from "../../types/auth/UserData";
import * as api from "./authService";
import { RootState } from "../../redux/store";
import { UserDateFilterProps } from "../../types/user/contact";

interface authState {
  status: "idle" | "loading" | "success" | "failure";
  user: UserDataProps;
  userWIthPassword: UserDataProps;
  refreshToken: string | null;
  accessToken: string | null;
  sentRecoveryEmail?: boolean;
  passwordIsReset: boolean;
  isEmailVerified: boolean;
  errorMsg?: any;
  doUserExist: boolean;
  users: UserDataProps[];
  refreshAllUsers: boolean;
  navpageIndex: number;
  totalUserPage: number;
  navpageName: string;
  profileToCheckOut: 'yes' | 'no';
}

const initialState: authState = {
  status: "idle",
  profileToCheckOut: 'no',
  totalUserPage: 0,
  user: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    passcode: "",
    password: "",
    role: "",
  },
  userWIthPassword: {
    userId: "",
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
  errorMsg: "",
  doUserExist: false,
  users: [],
  refreshAllUsers: false,
  navpageIndex: 0,
  navpageName: "",
  
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
      console.log("login user reject value", error);
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

export const checkIfUserExist = createAsyncThunk(
  "auth/checkIfUserExist",
  async (email: string, { rejectWithValue }) => {
    try {
      return await api.checkIfUserExist(email);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to find user");
    }
  }
);

export const getAllUser = createAsyncThunk(
  "auth/getAllUser",
  async (pageNum: number, { rejectWithValue }) => {
    try {
      return await api.getAllUsers(pageNum);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to find all user");
    }
  }
);

export const getTotalUserPage = createAsyncThunk(
  "auth/getTotalUserPage",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getTotalUsersPage();
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to find all user");
    }
  }
);

export const getAllUsersWithDateFilter = createAsyncThunk(
  "auth/getAllUsersWithDateFilter",
  async (userData: UserDateFilterProps, { rejectWithValue }) => {
    try {
      return await api.getAllUsersWithDateFilter(userData);
    } catch (error: any) {
      return rejectWithValue(error.message || "failed to find all user");
    }
  }
);

export const addProfilePics = createAsyncThunk(
  "auth/addProfilePics",
  async (userData: FormData, { rejectWithValue }) => {
    try {
      return await api.addUserProfilePics(userData);
    } catch (error: any) {
      return rejectWithValue(error.message || "something went wrong");
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
        userId: "",
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
    setNavIndexLink: (
      state,
      action: PayloadAction<{ name: string; index: number }>
    ) => {
      state.navpageIndex = action.payload.index;
      state.navpageName = action.payload.name;
    },
    setRecoveryPasswordLink: (state, action: PayloadAction<boolean>) => {
      state.sentRecoveryEmail = action.payload;
    },
    hidePasswordResetModal: (state, action: PayloadAction<boolean>) => {
      state.passwordIsReset = action.payload;
    },
    toggleProfileTocheckOut: (state, action: PayloadAction<'yes'| "no">) => {
      state.profileToCheckOut = action.payload;
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
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failure";
        state.errorMsg = action.payload;
      })
      .addCase(addProfilePics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProfilePics.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          console.log("profile data ", action.payload);
          state.user = action.payload;
        }
      })
      .addCase(addProfilePics.rejected, (state, action) => {
        state.status = "failure";
        state.errorMsg = action.payload;
      })
      .addCase(checkIfUserExist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkIfUserExist.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.doUserExist = action.payload;
        }
      })
      .addCase(checkIfUserExist.rejected, (state, action) => {
        state.status = "failure";
        state.errorMsg = action.payload;
      })
      .addCase(getTotalUserPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTotalUserPage.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.totalUserPage = action.payload;
        }
      })
      .addCase(getTotalUserPage.rejected, (state, action) => {
        state.status = "failure";
        state.errorMsg = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.user = action.payload;
          state.refreshAllUsers = true;
        }
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getAllUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.users = action.payload;
          state.refreshAllUsers = false;
        }
      })
      .addCase(getAllUser.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getAllUsersWithDateFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsersWithDateFilter.fulfilled, (state, action) => {
        state.status = "success";
        if (state.status === "success" && action.payload) {
          state.users = action.payload;
          state.refreshAllUsers = false;
        }
      })
      .addCase(getAllUsersWithDateFilter.rejected, (state) => {
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
  setNavIndexLink,
  resetUserState,
  toggleProfileTocheckOut
} = authSlice.actions;
export default authSlice.reducer;
