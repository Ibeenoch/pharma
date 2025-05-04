import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./userService";
import { RootState } from "../../redux/store";
import { ContactProps, EmailSubProps } from "../../types/user/contact";

interface authState {
  status: "idle" | "loading" | "success" | "failure";
  contacts: ContactProps[];
  emailSub: EmailSubProps[];
  totalContactPage: number;
  totalEmailSubPage: number;
}

const initialState: authState = {
  status: "idle",
  contacts: [],
  emailSub: [],
  totalContactPage: 0,
  totalEmailSubPage: 0,
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
  async (pageNum: number, { rejectWithValue }) => {
    try {
      return await api.getContactMsg(pageNum);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const getTotalContactPage = createAsyncThunk(
  "user/getTotalContactPage",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getTotalPageForContactMsg();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const getTotalEmailSubPage = createAsyncThunk(
  "user/getTotalEmailSubPage",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getTotalPageForEmailSub();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const getEmailSubscription = createAsyncThunk(
  "user/getEmailSubscription",
  async (pageNum: number, { rejectWithValue }) => {
    try {
      return await api.getEmailSub(pageNum);
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
      .addCase(getTotalContactPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTotalContactPage.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.totalContactPage = action.payload;
        }
      })
      .addCase(getTotalContactPage.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(getTotalEmailSubPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTotalEmailSubPage.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.totalEmailSubPage = action.payload;
        }
      })
      .addCase(getTotalEmailSubPage.rejected, (state) => {
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
