import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import API from "../../services/API";
import toast from "react-hot-toast";

// Async thunk for logging in
// export const loginUserAsync = createAsyncThunk(
//   "auth/login",
//   async (userDetails, { rejectWithValue }) => {
//     try {
//       const { data } = await API.post("/auth/login", userDetails);
//       console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", data);
//       toast.success(data.message);
//       return data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error?.message);
//       return rejectWithValue(error?.response?.data || error);
//     }
//   }
// );

// Initial auth state
const initialState = {
  loading: false,
  error: null,
  currentStudent: null,
  currentFaculty: null,
};

// Auth slice with reducers and actions
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCurrentStudent: (state, action) => {
      state.currentStudent = action.payload;
    },
    setCurrentFaculty: (state, action) => {
      state.currentFaculty = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

// Export actions, reducer, and selector
export const { setCurrentFaculty, setCurrentStudent } = adminSlice.actions;
export default adminSlice.reducer;
