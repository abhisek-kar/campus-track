import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import API from "../../services/API";
import toast from "react-hot-toast";

// Async thunk for logging in
export const getAllCourseOfFacultyAsync = createAsyncThunk(
  "faculty/courses",
  async (facultyId, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/faculty/courses/" + facultyId);
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
  allCoursesAssigned: [],
  studentCount: [],
  allStudents: [],
  storeAttendanceDetails: [],
};

// Auth slice with reducers and actions
const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    clearFaculty: (state) => {
      state.error = null;
      state.loading = false;
      state.allCoursesAssigned = [];
      state.allStudents = [];
      state.studentCount = [];
      state.storeAttendanceDetails = [{}];
    },
    setAllCoursesAssigned: (state, action) => {
      state.allCoursesAssigned = action.payload;
    },
    setStudentCount: (state, action) => {
      state.studentCount = action.payload;
    },
    setAllStudents: (state, action) => {
      state.allStudents = action.payload;
    },
    setStoreAttendanceDetails: (state, action) => {
      const payload = action.payload;
      const idx = state.storeAttendanceDetails.findIndex(
        (item) => item?.student === payload?.student
      );
      if (idx === -1) {
        state.storeAttendanceDetails.push(payload);
      } else {
        state.storeAttendanceDetails[idx] = payload;
      }
    },
    clearStoreAttendanceDetails: (state) => {
      state.storeAttendanceDetails = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCourseOfFacultyAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCourseOfFacultyAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.allCoursesAssigned = action?.payload?.faculty?.courses;
    });
    builder.addCase(getAllCourseOfFacultyAsync.rejected, (state) => {
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
export const {
  clearFaculty,
  setAllCoursesAssigned,
  setAllStudents,
  setStudentCount,
  setStoreAttendanceDetails,
  clearStoreAttendanceDetails,
} = facultySlice.actions;
export default facultySlice.reducer;
