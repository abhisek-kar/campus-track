import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import API from "../../services/API";

// login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { email, password, role });
      console.log(data);
      if (data.success) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        window.location.replace(`/${role}/${data.id}`);
      }

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
