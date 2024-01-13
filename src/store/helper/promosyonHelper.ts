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
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const getPromosyonsBySeller = async () => {
  const response = await axiosInstance.get(
    `http://localhost:4000/api/promotion/seller`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const addPromotion = async ({ promotion }: any) => {
  const response = await axiosInstance.post(
    `http://localhost:4000/api/promotion/`,
    { promotion },
    { withCredentials: true }
  );
  return response.data;
};

const getPromotionById = async (id: string) => {
  const response = await axiosInstance.get(
    `http://localhost:4000/api/promotion/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePromotionById = async ({ promotion, id }: any) => {
  const response = await axiosInstance.post(
    `http://localhost:4000/api/promotion/${id}`,
    {
      promotion,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deletePromotionById = async (id: any) => {
  const response = await axiosInstance.delete(
    `http://localhost:4000/api/promotion/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const promosyonHelper = {
  addPromotion,
  getPromosyonsBySeller,
  getPromotionById,
  updatePromotionById,
  deletePromotionById,
};
export default promosyonHelper;
