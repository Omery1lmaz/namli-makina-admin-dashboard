import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import authService from './helper/authHelper';
import productService from './helper/productHelper';
import { useNavigate } from 'react-router-dom';
import env from '../env';
import {
  errorNotification,
  successNotification,
} from '../services/notificationHelper';
function groupOrdersByDate(orderRecords) {
  const groupedOrders = {};

  orderRecords.forEach((order) => {
    const date = new Date(order.date).toISOString().split('T')[0]; // Yalnızca tarih kısmını alır (yyyy-mm-dd)

    // Eğer tarihe ait bir grup yoksa oluştur
    if (!groupedOrders[date]) {
      groupedOrders[date] = {
        orders: [order],
        totalOrders: 1,
        totalAmount: order.totalPrice,
        totalCancelledAmount: order.isReady === 'Cancel' ? order.totalPrice : 0,
      };
    } else {
      // Eğer tarihe ait bir grup varsa mevcut gruba ekle
      groupedOrders[date].orders.push(order);
      groupedOrders[date].totalOrders += 1;
      groupedOrders[date].totalAmount += order.totalPrice;
      groupedOrders[date].totalCancelledAmount +=
        order.isReady === 'Cancel' ? order.totalPrice : 0;
    }
  });

  // Sonuçları bir array'e çevir
  const resultArray = Object.entries(groupedOrders).map(([date, data]) => ({
    date,
    totalOrders: data.totalOrders,
    totalAmount: data.totalAmount,
    totalCancelledAmount: data.totalCancelledAmount,
    orders: data.orders,
  }));

  return resultArray;
}

export const getCategories = createAsyncThunk(
  '/getCategories',
  async (thunkAPI: any) => {
    try {
      return await productService.getCategoriesHelper();
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

export const getAdminDashBoardInf = createAsyncThunk(
  '/getAdminDashBoardInf',
  async ({ query }: any, thunkAPI) => {
    try {
      return await productService.getAdminDashboardInf({ query });
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
export const updateOrderStatus = createAsyncThunk(
  '/updateOrderStatus',
  async ({ id, status }: any, thunkAPI) => {
    try {
      console.log(id, 'id');
      const response = await productService.UpdateOrderStatus({ id, status });
      successNotification('Sipariş Durumu Başarıyla Güncellendi');
      const t = { id, status };
      thunkAPI.dispatch(updateOrders(response)); // Remove 'await' from this line
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
export const createOrder = createAsyncThunk(
  '/createOrder',
  async (
    {
      totalPrice,
      orderMessage,
      name,
      products,
      user,
      seller,
      shippingAddress,
      productsQnty,
      isTakeAway,
      tip,
    }: any,
    thunkAPI
  ) => {
    try {
      const response = await productService.createOrder({
        name,
        products,
        user,
        seller,
        shippingAddress,
        orderMessage,
        productsQnty,
        totalPrice,
        isTakeAway,
        tip,
      });
      successNotification('Order Başarıyla Oluştu');
      return {
        response,
        status: '200',
      };
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

export const createTip = createAsyncThunk(
  '/asdasd',
  async ({ tip, id, seller }: any, thunkAPI) => {
    try {
      const response = await productService.createTip({
        tip,
        id,
        seller,
      });
      errorNotification('Tip başarıyla oluşturuldu');
      return {
        response,
        status: '200',
      };
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

export const getOrderBySeller = createAsyncThunk(
  '/getOrderBySeller',
  async (thunkAPI: any) => {
    try {
      return await productService.getOrderBySeller();
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

export const deleteOrder = createAsyncThunk(
  '/deleteOrder',
  async ({ id }: any, thunkAPI) => {
    try {
      const { data } = await productService.deleteOrder({ id });
      return data;
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

export const getOrderById = createAsyncThunk(
  '/getOrderById',
  async ({ id }: any, thunkAPI) => {
    try {
      const { data } = await productService.getOrderById({ id });
      return data;
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

export const getCategoryById = createAsyncThunk(
  '/getCategoryById',
  async ({ id }: any, thunkAPI) => {
    try {
      return await productService.getCategoryByIdHelper({ id });
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

export const getProduct = createAsyncThunk(
  '/getProduct',
  async ({ id }: any, thunkAPI) => {
    try {
      console.log('id', id);
      return await productService.getProduct({ id });
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
export const updateProductsImage = createAsyncThunk(
  '/updateProductsImage',
  async ({ id, formData }: any, thunkAPI) => {
    try {
      console.log('id', id);
      const response = await productService.updateProductsImage({
        id,
        formData,
      });
      successNotification('Ürün Resmi Başarıyla Güncellendi');
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

export const deleteCategoryById = createAsyncThunk(
  '/deleteCategoryById',
  async ({ id }: any, thunkAPI) => {
    try {
      await productService.deleteCategoryById({ id });
      successNotification('Category Başarıyla Silindi');
      return id;
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

export const deleteProductById = createAsyncThunk(
  '/deleteProductById',
  async ({ id, user }: any, thunkAPI) => {
    try {
      console.log('id', id, user);
      const response = await productService.deleteProductById({ id, user });
      successNotification('Product Başarıyla Silindi');
      return id;
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

export const getCatsBySeller = createAsyncThunk(
  '/getCatsBySeller',
  async (thunkAPI: any) => {
    try {
      const res = await productService.getCatsHelper();
      return res;
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

export const getCategoriesBySeller = createAsyncThunk(
  '/getCategoriesBySeller',
  async (thunkAPI) => {
    try {
      console.log('aşsdkjakldjaskljdklasj');
      const response = await productService.getCategoriesBySellerHelper();
      console.log(response, 'response get categories');
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

export const getCategoriesBySellerId = createAsyncThunk(
  '/getCategoriesBySellerId',
  async (id, thunkAPI) => {
    console.log(id, 'id');
    try {
      const response = await productService.getCategoriesBySellerIdHelper(id);
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
export const addCategories = createAsyncThunk(
  '/addCategories',
  async (category, thunkAPI) => {
    try {
      console.log(category);
      const v = await productService.addCategoriesHelper(category);
      successNotification('Gategory Başarıyla Güncellendi');
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

export const updateCategory = createAsyncThunk(
  '/updateCategory',
  async ({ category, id }: any, thunkAPI) => {
    try {
      const res = await productService.updateCategory({ category, id });
      successNotification('Category Başarıyla Güncellendi');
      return res;
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

export const getProductsById = createAsyncThunk(
  '/getProducts',
  async (id, thunkAPI) => {
    try {
      const response = await productService.getProductsByIdHelper(id);
      console.log(response, 'response');
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

export const getProductsBySeller = createAsyncThunk(
  '/getProductsBySeller',
  async (id, thunkAPI) => {
    try {
      const res = await productService.getProductsBySeller(id);
      return res;
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

export const getProductsBySellerLimit = createAsyncThunk(
  '/getProductsBySellerLimit',
  async ({ skip = 0, limit = 99999 }: any, thunkAPI) => {
    console.log(skip, 'skip');
    const v = skip == 1 ? 0 : skip * 10 - 10;
    try {
      const res = await productService.getProductsBySellerWithLimit({
        skip,
        limit,
      });
      return res;
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

export const getOrderBySellerWithLimit = createAsyncThunk(
  '/getOrderBySellerWithLimit',
  async ({ skip = 0, limit = 0, query }: any, thunkAPI) => {
    try {
      const res = await productService.getOrderBySellerWithLimit({
        skip,
        limit,
        query,
      });
      return res;
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
export const getOrderRecords = createAsyncThunk(
  '/getOrderRecords',
  async ({ query }: any, thunkAPI) => {
    try {
      const res = await productService.getOrderRecords({
        query,
      });
      return res;
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
export const getInvoicesRecords = createAsyncThunk(
  '/getInvoicesRecords',
  async ({ query }: any, thunkAPI) => {
    try {
      const res = await productService.getInvoicesRecords({
        query,
      });
      return res;
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

export const addProduct = createAsyncThunk(
  '/addProduct',
  async ({ product, formData }: any, thunkAPI) => {
    try {
      const v = await productService.addProduct({ product, formData });
      successNotification('Product başarıyla güncellendi');
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
export const newAddProduct = createAsyncThunk(
  '/newAddProduct',
  async ({ formData }: any, thunkAPI) => {
    try {
      const v = await productService.newAddProduct({ formData });
      successNotification('Product başarıyla güncellendi');
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

export const updateProduct = createAsyncThunk(
  '/updateProduct',
  async ({ product, productId }: any, { thunkAPI }: any) => {
    try {
      const response = await productService.updateProduct({
        product,
        productId,
      });
      successNotification('Product başarıyla güncellendi');
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      error(error.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateProductP = createAsyncThunk(
  '/updateProduct',
  async ({ product, productId }: any, { thunkAPI }: any) => {
    try {
      const response = await productService.updateProductP({
        product,
        productId,
      });
      successNotification('Product başarıyla güncellendi');
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

interface InitialState {
  categories: any[];
  category: any;
  sellerCategories: any[];
  isErrorP: boolean;
  isSuccessP: boolean;
  isLoadingP: boolean;
  messageP: string;
  products: any[];
  orders: any[];
  invoices: any[];
  confirmedOrders: any[];
  preparedOrders: any[];
  readyOrders: any[];
  order: any;
  product: any;
  orderRecords: any;
  sellerProducts: any[];
  adminDashBoard: any;
}

const initialState: InitialState = {
  categories: [],
  category: {},
  sellerCategories: [],
  isErrorP: false,
  isSuccessP: false,
  isLoadingP: false,
  messageP: '',
  products: [],
  orders: [],
  confirmedOrders: [],
  preparedOrders: [],
  orderRecords: [],
  invoices: [],
  readyOrders: [],
  order: {},
  product: {},
  sellerProducts: [],
  adminDashBoard: {},
};

// Then, handle actions in your reducers:

const productSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addOrder(state: any, action: any) {
      console.log('action', action.payload);
      console.log('length', state.orders);
      const newOrders = [action.payload, ...state.orders];
      state.orders = newOrders;
      console.log('length after', state.orders);
    },
    updateProductIsActive(state: InitialState, action: any) {
      const product = action.payload;
      console.log('product', product);
      const newProducts = [...state.sellerProducts];
      const index: number = newProducts.findIndex(
        (i: any) => i._id === product._id
      );
      console.log(index, 'index');
      newProducts[index].isActive = product.isActive;
      state.sellerProducts = [...newProducts];
    },
    updateOrders(state: InitialState, action) {
      const v = action.payload;
      console.log(v._id, v.isReady);

      // state.orders içinde güncellenmek istenen objenin indexini buluyoruz.
      const d = state.orders.findIndex((i: any) => i._id === v._id);
      console.log(d);

      if (d !== -1) {
        // state.orders dizisindeki ilgili objeyi kopyalıyoruz.
        const updatedOrder = { ...state.orders[d], isReady: v.isReady };

        // Kopyalanan objeyi state.orders dizisine yerleştiriyoruz.
        state.orders[d] = updatedOrder;

        // Eğer yapmak istediğiniz sadece bu güncelleme ise, aşağıdaki iki satırı yorumdan çıkarıp kullanabilirsiniz.
        //const deepCopyOrders = [...state.orders];
        //console.log(deepCopyOrders);
      }
      console.log(state.orders, 'state.orders');
      const preparedOrders = state.orders.filter((order: any) => {
        return order.isReady == 'InProgress';
      });
      const confirmedOrders = state.orders.filter((order: any) => {
        return order.isReady == 'Not Approved';
      });
      const readyOrders = state.orders.filter((order: any) => {
        return order.isReady == 'Ready';
      });
      state.preparedOrders = preparedOrders;
      state.confirmedOrders = confirmedOrders;
      state.readyOrders = readyOrders;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateProductsImage.fulfilled, (state, action) => {
        state.isLoadingP = false;
      })
      .addCase(updateProductsImage.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(updateProductsImage.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getInvoicesRecords.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.invoices = action.payload.invoices;
      })
      .addCase(getInvoicesRecords.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getInvoicesRecords.pending, (state, action) => {
        state.isLoadingP = true;
      })

      .addCase(getOrderBySellerWithLimit.fulfilled, (state, action) => {
        const v = action.payload;
        const preparedOrders = v.filter((order: any) => {
          return order.isReady == 'InProgress';
        });
        const confirmedOrders = v.filter((order: any) => {
          return order.isReady == 'Not Approved';
        });
        const readyOrders = v.filter((order: any) => {
          return order.isReady == 'Ready';
        });
        state.preparedOrders = preparedOrders;
        state.confirmedOrders = confirmedOrders;
        state.readyOrders = readyOrders;
        state.isLoadingP = false;
        state.orders = action.payload;
      })
      .addCase(getOrderBySellerWithLimit.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getOrderBySellerWithLimit.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getAdminDashBoardInf.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.adminDashBoard = action.payload;
      })
      .addCase(getAdminDashBoardInf.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getAdminDashBoardInf.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getCategoriesBySellerId.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.sellerCategories = action.payload;
      })
      .addCase(getCategoriesBySellerId.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getCategoriesBySellerId.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getProductsBySellerLimit.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.sellerProducts = action.payload;
      })
      .addCase(getProductsBySellerLimit.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getProductsBySellerLimit.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getCatsBySeller.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.sellerCategories = action.payload;
      })
      .addCase(getCatsBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getCatsBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getOrderById.pending, (state, action) => {
        state.isLoadingP = true;
      })

      .addCase(getOrderRecords.fulfilled, (state, action) => {
        state.isLoadingP = false;
        const groupedOrders = groupOrdersByDate(action.payload); // Verileri tarihlerine göre grupla
        state.orderRecords = groupedOrders; // state'i güncelle
        console.log(typeof state.orderRecords);
      })
      .addCase(getOrderRecords.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getOrderRecords.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        // const index = state.orders.findIndex(
        //   (order: any) => order._id == action.payload.id
        // );
        // const deepCopyArray = [...state.orders];
        // deepCopyArray[index] = {
        //   ...deepCopyArray[index],
        //   isReady: action.payload.status,
        // };
        // state.orders = [...deepCopyArray];
        state.isLoadingP = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        console.log(action.payload);
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.isLoadingP = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.orders = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.isLoadingP = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoadingP = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(createOrder.pending, (state, action) => {
        state.isLoadingP = true;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(deleteCategoryById.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getOrderBySeller.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getOrderBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getOrderBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.sellerCategories = state.sellerCategories.filter(
          (v: any) => v._id !== action.payload
        );
        // state.sellerCategories = action.payload;
        state.isLoadingP = false;
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(deleteProductById.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        const newList = state.sellerProducts?.filter(
          (p: any) => p._id != action.payload
        );
        console.log(newList.length);
        console.log(state.sellerProducts.length);
        state.sellerProducts = newList;
        state.isLoadingP = false;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getCategoryById.pending, (state, action) => {
        state.isLoadingP = true;
        state.isSuccessP = true;
      })

      .addCase(getCategoriesBySeller.fulfilled, (state, action) => {
        state.sellerCategories = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(getCategoriesBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getCategoriesBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(addCategories.fulfilled, (state, action) => {
        state.categories = action.payload as any;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(addCategories.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(addCategories.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoadingP = false;
        state.isSuccessP = true;
        state.category = action.payload;
        console.log(action.payload, 'action payload');
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getProductsBySeller.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(getProductsBySeller.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getProductsBySeller.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getProductsById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(getProductsById.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(getProductsById.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoadingP = false;
        state.isSuccessP = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isErrorP = true;
        state.isSuccessP = false;
        state.isLoadingP = false;
        state.messageP = action.payload as any;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoadingP = true;
      });
  },
});
export const { addOrder, updateProductIsActive, updateOrders } =
  productSlice.actions;

export default productSlice.reducer;
