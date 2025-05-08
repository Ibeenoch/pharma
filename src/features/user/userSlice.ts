import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./userService";
import { RootState } from "../../redux/store";
import { ContactProps, EmailSubProps } from "../../types/user/contact";
import { NotificationProps } from "../../types/notification/Notification";

interface authState {
  status: "idle" | "loading" | "success" | "failure";
  contacts: ContactProps[];
  emailSub: EmailSubProps[];
  totalContactPage: number;
  totalEmailSubPage: number;
  notifications: NotificationProps[];
  totalUnreadnotification: number;
}

const initialState: authState = {
  status: "idle",
  contacts: [],
  emailSub: [],
  notifications: [],
  totalUnreadnotification: 0,
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

export const createNotification = createAsyncThunk(
  "notification/createNotification",
  async (notificationData: NotificationProps, { rejectWithValue }) => {
    try {
      return await api.createNotification(notificationData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const updateReadNotification = createAsyncThunk(
  "notification/updateReadNotification",
  async (notificationData: NotificationProps, { rejectWithValue }) => {
    try {
      return await api.markReadNotification(notificationData);
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const fetchAllNotification = createAsyncThunk(
  "notification/fetchAllNotification",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllNotifications();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wromg");
    }
  }
);

export const fetchAllUnReadNotification = createAsyncThunk(
  "notification/fetchAllUnReadNotification",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getUnreadNotifications();
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
      })
      .addCase(createNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          state.notifications.push(action.payload);
        }
      })
      .addCase(createNotification.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(updateReadNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateReadNotification.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          const index = state.notifications.findIndex((n) => n.$id === action.payload?.$id)
          state.notifications[index] = action.payload;
        }
      })
      .addCase(updateReadNotification.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(fetchAllNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllNotification.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          state.notifications = action.payload;
        }
      })
      .addCase(fetchAllNotification.rejected, (state) => {
        state.status = "failure";
      })
      .addCase(fetchAllUnReadNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUnReadNotification.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          state.totalUnreadnotification = action.payload.length;
        }
      })
      .addCase(fetchAllUnReadNotification.rejected, (state) => {
        state.status = "failure";
      });
   
  },
});

export const selectUser = (state: RootState) => state.user;
export const {} = userSlice.actions;
export default userSlice.reducer;
