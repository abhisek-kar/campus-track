import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import API from "../../services/API";
import toast from "react-hot-toast";

// Async thunk for logging in
export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (userDetails, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", userDetails);
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", data);
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

// Initial auth state
const initialState = {
  user: null,
  loading: false,
  error: null,
  userRole: "",
};

// Auth slice with reducers and actions
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clear: (state) => {
      state.error = null;
      state.loading = false;
      state.user = null;
      state.userRole = "";
    },
    // Additional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userRole = action.payload.role;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed";
      });
  },
});

// Export actions, reducer, and selector
export const { clear } = authSlice.actions;
export default authSlice.reducer;
