import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "./userService";
import { RootState } from "../../redux/store";
import { ContactProps, EmailSubProps } from "../../types/user/contact";

interface authState {
  status: "idle" | "loading" | "success" | "failure";
  contacts: ContactProps[];
  emailSub: EmailSubProps[];
}

const initialState: authState = {
  status: "idle",
  contacts: [],
  emailSub: [],
};

export const sendContactMessage = createAsyncThunk(
  "user/sendContactMessage",
  async (contactData: ContactProps, { rejectWithValue }) => {
    try {
      return await api.sendContactMsg(contactData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const sendEmailSubscription = createAsyncThunk(
  "user/sendEmailSubscription",
  async (email: string, { rejectWithValue }) => {
    try {
      return await api.sendEmailSub(email);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const getContactMessage = createAsyncThunk(
  "user/getContactMessage",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getContactMsg();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const getEmailSubscription = createAsyncThunk(
  "user/getEmailSubscription",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getEmailSub();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.contacts.push(action.payload);
        }
      })
      .addCase(sendContactMessage.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getContactMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContactMessage.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.contacts = action.payload;
        }
      })
      .addCase(getContactMessage.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(sendEmailSubscription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendEmailSubscription.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.emailSub.push(action.payload);
        }
      })
      .addCase(sendEmailSubscription.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getEmailSubscription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmailSubscription.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.emailSub = action.payload;
        }
      })
      .addCase(getEmailSubscription.rejected, (state) => {
        state.status = "failure";
      });
   
  },
});

export const selectUser = (state: RootState) => state.user;
export const {} = userSlice.actions;
export default userSlice.reducer;
