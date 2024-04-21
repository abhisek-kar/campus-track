import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import API from "../../services/API";
import toast from "react-hot-toast";

// Async thunk for logging in
export const getAllStudentsAsync = createAsyncThunk(
  "admin/students",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/student");
      console.log(data);
      if (data?.success) {
        return data;
      }
      return rejectWithValue(data?.message);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data || error);
    }
  }
);
export const getAllFacultiesAsync = createAsyncThunk(
  "admin/faculties",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/faculty");
      console.log(data);
      if (data?.success) {
        return data;
      }
      return rejectWithValue(data?.message);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

// Initial auth state
const initialState = {
  loading: false,
  error: null,
  currentStudent: null,
  currentFaculty: null,
  totalStudents: 0,
  allStudents: [],
  allFacutlies: [],
};

// Auth slice with reducers and actions
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdmin: (state) => {
      state.error = null;
      state.loading = false;
      state.allFacutlies = [];
      state.allStudents = [];
      state.currentFaculty = null;
      state.currentStudent = null;
      state.totalStudents = 0;
    },
    setCurrentStudent: (state, action) => {
      state.currentStudent = action.payload;
    },
    setCurrentFaculty: (state, action) => {
      state.currentFaculty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStudentsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllStudentsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.allStudents = action?.payload?.students;
    });
    builder.addCase(getAllStudentsAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllFacultiesAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFacultiesAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.allFacutlies = action?.payload?.faculty;
    });
    builder.addCase(getAllFacultiesAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Export actions, reducer, and selector
export const { setCurrentFaculty, setCurrentStudent, clearAdmin } =
  adminSlice.actions;
export default adminSlice.reducer;
