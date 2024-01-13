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
const getPromotionsBySeller = async () => {
  const response = await axiosInstance.get(
    `http://localhost:4000/api/variations/`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const addPromotion = async ({ variation }: any) => {
  const response = await axiosInstance.post(
    `http://localhost:4000/api/variations/`,
    { variation },
    { withCredentials: true }
  );
  return response.data;
};

const insertOptionHelper = async ({ option }: any) => {
  const response = await axiosInstance.post(
    `http://localhost:4000/api/options/`,
    { option }
  );
  return response.data;
};
const putOptionHelper = async ({ option, id }: any) => {
  const response = await axiosInstance.put(
    `http://localhost:4000/api/options/${id}`,
    { option }
  );
  return response.data;
};

const getOptionBySellerHelper = async ({ id }: any) => {
  const response = await axiosInstance.get(
    `http://localhost:4000/api/options/${id}`
  );
  return response.data;
};

const getOptionsBySellerHelper = async () => {
  console.log('when user refresh page');
  const response = await axiosInstance.get(
    `http://localhost:4000/api/options/`
  );
  return response.data;
};

const getPromotionById = async (id: string) => {
  const response = await axiosInstance.get(
    `http://localhost:4000/api/variations/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePromotionById = async ({ variation, id }: any) => {
  const response = await axiosInstance.put(
    `http://localhost:4000/api/variations/${id}`,
    {
      variation,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deletePromotionById = async (id: any) => {
  const response = await axiosInstance.delete(
    `http://localhost:4000/api/variations/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const promotionHelper = {
  addPromotion,
  getPromotionsBySeller,
  getPromotionById,
  updatePromotionById,
  deletePromotionById,
  insertOptionHelper,
  getOptionsBySellerHelper,
  getOptionBySellerHelper,
  putOptionHelper,
};
export default promotionHelper;
