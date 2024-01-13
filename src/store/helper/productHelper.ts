import axios from 'axios';
import Cookies from 'js-cookie';
const defaultOptions = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
let axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
  const token = Cookies.get('token');
  config.headers.Authorizgetation = token ? `Bearer ${token}` : '';
  return config;
});

const getCategoriesHelper = async () => {
  const response = await axiosInstance.get(
    'http://localhost:4000/api/categories/categories'
  );

  return response.data;
};
const getOrderBySeller = async () => {
  const response = await axiosInstance.get(
    'http://localhost:4000/api/orders/order/seller',
    { withCredentials: true }
  );
  const arrayfororders = [...response.data];
  arrayfororders.sort((a: any, b: any) => {
    // @ts-expect-error
    return new Date(b.date) - new Date(a.date);
  });
  return arrayfororders;
};

const getAdminDashboardInf = async ({ query }: any) => {
  const res = await axiosInstance.post(
    'http://localhost:4000/api/admin/adminDashboard',
    { query: query },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const UpdateOrderStatus = async ({ id, status }: any) => {
  const response = await axiosInstance.put(
    `http://localhost:4000/api/orders/order/${id}`,
    { status },
    { withCredentials: true }
  );
  return response.data;
};
const getOrderById = async ({ id }: any) => {
  return axiosInstance.get(`http://localhost:4000/api/orders/order/${id}`, {
    withCredentials: true,
  });
};

const deleteOrder = async ({ id }: any) => {
  return axiosInstance.delete(`http://localhost:4000/api/orders/order/${id}`, {
    withCredentials: true,
  });
};

const createOrder = async ({
  isTakeAway,
  totalPrice,
  orderMessage,
  products,
  name,
  user,
  seller,
  shippingAddress,
  productsQnty,
  tip,
}: any) => {
  const response: any = axiosInstance.post(
    'http://localhost:4000/api/orders/order',
    {
      isTakeAway,
      totalPrice,
      name,
      products,
      user,
      seller,
      shippingAddress,
      productsQnty,
      orderMessage,
      tip,
    },
    { withCredentials: true }
  );

  return response.data;
};

const createTip = async ({ tip, id, seller }: any) => {
  const response: any = axiosInstance.post(
    `http://localhost:4000/api/orders/order/tip/${id}`,
    {
      tip,
      seller,
    },
    { withCredentials: true }
  );
  return response.data;
};

const deleteCategoryById = async ({ id }: any) => {
  const response: any = await axiosInstance.delete(
    `http://localhost:4000/api/categories/${id}`,
    { withCredentials: true }
  );

  return response.data;
};

const getProduct = async ({ id }: any) => {
  const response: any = await axiosInstance.get(
    `http://localhost:4000/api/products/${id}`
  );

  return response.data;
};

const getCategoryByIdHelper = async ({ id }: any) => {
  const response: any = await axiosInstance.get(
    `http://localhost:4000/api/categories/${id}`,
    { withCredentials: true }
  );

  return response.data;
};
const updateProductsImage = async ({ id, formData }: any) => {
  const token = Cookies.get('token');
  const response: any = await axios.post(
    `http://localhost:4000/api/products/image/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// const getCategoriesBySellerHelper = async ({ id, user }: any) => {
const getCategoriesBySellerHelper = async () => {
  const response: any = await axiosInstance.get(
    `http://localhost:4000/api/categories/categories/seller`,
    { withCredentials: true }
  );
  return response.data;
};

const getCategoriesBySellerIdHelper = async (id: any) => {
  const response = await axiosInstance.get(
    `http://localhost:4000/api/categories/categories/${id}`
  );
  return response.data;
};

const getPromotionsBySeller = async () => {
  const response: any = await axiosInstance.get(
    `http://localhost:4000/api/promotions/`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const addCategoriesHelper = async (category: any) => {
  const response: any = await axiosInstance.post(
    'http://localhost:4000/api/categories/add-categories',
    category,
    { withCredentials: true }
  );
  return response.data;
};

// @Post
// @Update Product
// @Private
const updateCategory = async ({ category, id }: any) => {
  const response: any = await axiosInstance.put(
    `http://localhost:4000/api/categories/categories/${id}`,
    category,
    { withCredentials: true }
  );
  return response.data;
};

const addProduct = async ({ product, formData }: any) => {
  // const response: any = await axios.post(
  //   'http://localhost:4000/api/products/',
  //   formData,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  // return response.data;
};

const newAddProduct = async ({ formData }: any) => {
  // for (var key of formData.entries()) {
  //   console.log(JSON.stringify(key[0]) + ', ' + JSON.stringify(key[1]));
  // }
  // const token = Cookies.get('token');
  // const response: any = await axios.post(
  //   'http://localhost:4000/api/new-product/',
  //   formData, {
  //     headers: {
  //       Authorization: token ? `Bearer ${token}` : '';
  //     }
  //   }
  // );
  // return response.data;
};
// @Post
// @Update Product
// @Private
const updateProduct = async ({ product, productId }: any) => {
  const response: any = await axiosInstance.post(
    `http://localhost:4000/api/products/${productId}`,
    product,
    { withCredentials: true }
  );
  return response.data;
};

const updateProductP = async ({ product, productId }: any) => {
  const response: any = await axiosInstance.post(
    `http://localhost:4000/api/products/p/${productId}`,
    { product },
    { withCredentials: true }
  );
  return response.data;
};

// Get Product By Id

const getProductsByIdHelper = async (id: any) => {
  const response: any = await axiosInstance.get(
    `http://localhost:4000/api/products/${id}`
  );
  return response.data;
};

// Get Seller's Products

const getProductsBySeller = async (id: any) => {
  const response: any = await axiosInstance.get(
    `http://localhost:4000/api/products/seller/${id}`
  );
  return response.data;
};

const getProductsBySellerWithLimit = async ({ skip, limit }: any) => {
  const response: any = await axiosInstance.get(
    `http://localhost:4000/api/products/seller/limit/${limit}/${skip}`,
    { withCredentials: true }
  );
  return response.data;
};

const getOrderBySellerWithLimit = async ({ skip, limit, query }: any) => {
  const response: any = await axiosInstance.put(
    `http://localhost:4000/api/orders/order/seller/limit/${limit}/${skip}`,
    { query },
    { withCredentials: true }
  );
  return response.data;
};
const getOrderRecords = async ({ skip, limit, query }: any) => {
  const response: any = await axiosInstance.put(
    `http://localhost:4000/api/orders/order/seller/finance`,
    { query },
    { withCredentials: true }
  );
  return response.data;
};
const getInvoicesRecords = async ({ query }: any) => {
  const response: any = await axiosInstance.put(
    `http://localhost:4000/api/admin/invoice`,
    { query },
    { withCredentials: true }
  );
  return response.data;
};

const getCatsHelper = async () => {
  const response = await axiosInstance.get(
    `http://localhost:4000/api/categories/categories/seller`,
    { withCredentials: true }
  );
  return response.data;
};
const deleteProductById = async ({ id, user }: any) => {
  const response = await axiosInstance.delete(
    `http://localhost:4000/api/products/${id}`,
    { withCredentials: true }
  );

  return response.data;
};

const productService = {
  getCatsHelper,
  getCategoriesHelper,
  addCategoriesHelper,
  getOrderById,
  addProduct,
  getProductsBySeller,
  getProductsByIdHelper,
  updateProduct,
  getCategoryByIdHelper,
  updateCategory,
  getCategoriesBySellerHelper,
  deleteCategoryById,
  deleteProductById,
  getOrderBySeller,
  getProduct,
  createOrder,
  updateProductsImage,
  deleteOrder,
  UpdateOrderStatus,
  getProductsBySellerWithLimit,
  getCategoriesBySellerIdHelper,
  getOrderBySellerWithLimit,
  getAdminDashboardInf,
  getPromotionsBySeller,
  createTip,
  updateProductP,
  getOrderRecords,
  getInvoicesRecords,
  newAddProduct,
};
export default productService;
