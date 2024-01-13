import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import printerService from './helper/printerHelper';
import {
  errorNotification,
  successNotification,
} from '../services/notificationHelper';

export const getPrinters = createAsyncThunk(
  '/getPrinters',
  async (thunkAPI: any) => {
    try {
      return await printerService.getPrinters();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addPrinter = createAsyncThunk(
  '/addPrinter',
  async ({ printer }: any, thunkAPI: any) => {
    try {
      return await printerService.addPrinter({ printer });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePrinters = createAsyncThunk(
  '/updatePrinters',
  async ({ printers }: any, thunkAPI: any) => {
    try {
      return await printerService.updatePrinters({ printers });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLocalPrinters = createAsyncThunk(
  '/getLocalPrinters',
  async (thunkAPI: any) => {
    try {
      return await printerService.getLocalPrinters();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

interface InitialState {
  printers: any[];
  localPrinters: any[];
  isErrorPrt: boolean;
  isSuccessPrt: boolean;
  isLoadingPrt: boolean;
}

const initialState: InitialState = {
  printers: [],
  localPrinters: [],
  isErrorPrt: false,
  isSuccessPrt: false,
  isLoadingPrt: false,
};

// Then, handle actions in your reducers:

const printerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addPrinter.fulfilled, (state, action) => {
        state.isLoadingPrt = false;
      })
      .addCase(addPrinter.rejected, (state, action) => {
        state.isErrorPrt = true;
        state.isSuccessPrt = false;
        state.isLoadingPrt = false;
      })
      .addCase(addPrinter.pending, (state, action) => {
        state.isLoadingPrt = true;
      })
      .addCase(getPrinters.fulfilled, (state, action) => {
        state.printers = action.payload;
        state.isLoadingPrt = false;
      })
      .addCase(getPrinters.rejected, (state, action) => {
        state.isErrorPrt = true;
        state.isSuccessPrt = false;
        state.isLoadingPrt = false;
      })
      .addCase(getPrinters.pending, (state, action) => {
        state.isLoadingPrt = true;
      })
      .addCase(getLocalPrinters.fulfilled, (state, action) => {
        state.localPrinters = action.payload;
        state.isLoadingPrt = false;
      })
      .addCase(getLocalPrinters.rejected, (state, action) => {
        state.isErrorPrt = true;
        state.isSuccessPrt = false;
        state.isLoadingPrt = false;
      })
      .addCase(getLocalPrinters.pending, (state, action) => {
        state.isLoadingPrt = true;
      });
  },
});

export default printerSlice.reducer;
