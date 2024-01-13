import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import promotionService from './helper/promotionHelper';
import {
  errorNotification,
  successNotification,
} from '../services/notificationHelper';

export const addPromotion = createAsyncThunk(
  '/addPromotion',
  async ({ variation }: any, thunkAPI) => {
    try {
      const response = await promotionService.addPromotion({ variation });
      successNotification(response);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const insertOption = createAsyncThunk(
  '/insertOption',
  async ({ option }: any, thunkAPI) => {
    try {
      const response = await promotionService.insertOptionHelper({ option });
      successNotification(response);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const putOption = createAsyncThunk(
  '/putOption',
  async ({ option, id }: any, thunkAPI) => {
    try {
      const response = await promotionService.putOptionHelper({ option, id });
      successNotification(response);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOptionBySeller = createAsyncThunk(
  '/getOptionBySeller',
  async ({ id }: any, thunkAPI) => {
    try {
      const response = await promotionService.getOptionBySellerHelper({ id });
      successNotification(response);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOptionsBySeller = createAsyncThunk(
  '/getOptionsBySeller',
  async (thunkAPI: any) => {
    try {
      const response = await promotionService.getOptionsBySellerHelper();
      successNotification(response);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      errorNotification(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getPromotionsBySeller User
export const getPromotionsBySeller = createAsyncThunk(
  '/getPromotionsBySeller',
  async (thunkAPI) => {
    try {
      const response = await promotionService.getPromotionsBySeller();
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
export const getPromotionsById = createAsyncThunk(
  '/getPromotionById',
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
export const updatePromotionById = createAsyncThunk(
  '/updatePromotionById',
  async ({ variation, id }: any, thunkAPI) => {
    try {
      const response = await promotionService.updatePromotionById({
        variation,
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

export const deletePromotionById = createAsyncThunk(
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
  promotions: [],
  options: [],
  option: {},
  promotion: {},
  isLoading: false,
  isError: false,
};

// Then, handle actions in your reducers:
const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOptionBySeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.option = action.payload.option;
      })
      .addCase(getOptionBySeller.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getOptionBySeller.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(insertOption.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(insertOption.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(insertOption.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOptionsBySeller.fulfilled, (state, action) => {
        state.options = action.payload.options;
        state.isLoading = false;
      })
      .addCase(getOptionsBySeller.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(getOptionsBySeller.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPromotionsBySeller.fulfilled, (state, action) => {
        state.promotions = action.payload;
        state.isLoading = false;
      })
      .addCase(getPromotionsBySeller.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(getPromotionsBySeller.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPromotionsById.fulfilled, (state: any, action) => {
        state.promotion = action.payload;
        state.isLoading = false;
      })
      .addCase(getPromotionsById.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(getPromotionsById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePromotionById.fulfilled, (state: any, action) => {
        const newState = state.promotions.filter((p: any) => {
          return p._id != action.payload;
        });
        state.isLoading = false;
        state.promotions = newState;
      })
      .addCase(deletePromotionById.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(deletePromotionById.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default promotionSlice.reducer;
