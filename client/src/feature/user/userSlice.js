/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  customFetch,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
// import { customFetch } from "../../utils";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.delete("/auth/logout", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logoutUser: (state) => {
    //   state.user = null;
    //   removeUserFromLocalStorage();
    //   toast.success("loging out");
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success("successfully logged in");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, msg } = action.payload;
        console.log(action, "chek user data after registering");
        state.isLoading = false;
        toast.success(msg);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        const { msg } = action.payload;
        state.isLoading = false;
        state.user = null;
        removeUserFromLocalStorage();
        toast.success(msg);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
// export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
