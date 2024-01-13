import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import promotionService from './helper/promosyonHelper';
import {
  errorNotification,
  successNotification,
} from '../services/notificationHelper';

export const addPromosyon = createAsyncThunk(
  '/addPromosyon',
  async ({ promotion }: any, thunkAPI) => {
    try {
      const response = await promotionService.addPromotion({ promotion });
      successNotification(response);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(error.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getPromotionsBySeller User
export const getPromosyonsBySeller = createAsyncThunk(
  '/getPromosyonsBySeller',
  async (thunkAPI) => {
    try {
      const response = await promotionService.getPromosyonsBySeller();
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);
export const getPromosyonById = createAsyncThunk(
  '/getPromosyonById',
  async (id, thunkAPI) => {
    try {
      const response = await promotionService.getPromotionById(id);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);
export const updatePromosyonById = createAsyncThunk(
  '/updatePromosyonById',
  async ({ promotion, id }: any, thunkAPI) => {
    try {
      const response = await promotionService.updatePromotionById({
        promotion,
        id,
      });
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);

export const deletePromosyonById = createAsyncThunk(
  '/deletePromotionById',
  async (id: any, thunkAPI) => {
    try {
      const response = await promotionService.deletePromotionById(id);
      successNotification('Promotion deleted successfully');
      return id;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);

export const initialState: any = {
  promosyons: [],
  promosyon: {},
  isLoadingPr: false,
  isError: false,
};

// Then, handle actions in your reducers:
const promotionSlice = createSlice({
  name: 'promosyon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromosyonById.fulfilled, (state, action) => {
        state.promosyon = action.payload;
        state.isLoadingPr = false;
      })
      .addCase(getPromosyonById.rejected, (state) => {
        state.isLoadingPr = false;
      })
      .addCase(getPromosyonById.pending, (state) => {
        state.isLoadingPr = true;
      })
      .addCase(getPromosyonsBySeller.fulfilled, (state, action) => {
        state.promosyons = action.payload;
        state.isLoadingPr = false;
      })
      .addCase(getPromosyonsBySeller.rejected, (state) => {
        state.isLoadingPr = false;
      })
      .addCase(getPromosyonsBySeller.pending, (state) => {
        state.isLoadingPr = true;
      })
      .addCase(deletePromosyonById.fulfilled, (state, action) => {
        console.log(action.payload, 'action payload');
        let newArray = [...state.promosyons];
        const index = newArray.findIndex((i: any) => i._id === action.payload);
        newArray.splice(index, 1);
        state.promosyons = newArray;
        state.isLoadingPr = false;
      })
      .addCase(deletePromosyonById.rejected, (state) => {
        state.isLoadingPr = false;
      })
      .addCase(deletePromosyonById.pending, (state) => {
        state.isLoadingPr = true;
      });
  },
});

export default promotionSlice.reducer;
