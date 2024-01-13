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

// GET WAITER HELPER
const getWaiter = async (id: any) => {
  const { data } = await axiosInstance.get(
    `http://localhost:4000/api/waiters/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

// GET WAITERS HELPER
const getWaitersHelper = async () => {
  const { data } = await axiosInstance.get(
    'http://localhost:4000/api/waiters/',
    {
      withCredentials: true,
    }
  );
  return data;
};

// GET WAITERS BY SELLER HELPER
const getWaitersBySellerIdHelper = async (id: any) => {
  const { data } = await axiosInstance.get(
    `http://localhost:4000/api/waiters/seller/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

// ADD WAITER HELPER
const addWaiterHelper = async (waiter: any) => {
  console.log(waiter);
  const { data } = await axiosInstance.post(
    `http://localhost:4000/api/waiters/`,
    { waiter },
    {
      withCredentials: true,
    }
  );
  return data;
};

// UPDATE WAITER HELPER
const updateWaiterHelper = async (waiter: any) => {
  console.log(waiter);
  const { data } = await axiosInstance.post(
    `http://localhost:4000/api/waiters/${waiter._id}`,
    { waiter },
    {
      withCredentials: true,
    }
  );
  return data;
};

// DELETE WAITER HELPER
const deleteWaiterHelper = async (id: any) => {
  console.log(id);
  const { data } = await axiosInstance.delete(
    `http://localhost:4000/api/waiters/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

const waiterService = {
  getWaitersHelper,
  deleteWaiterHelper,
  addWaiterHelper,
  getWaiter,
  updateWaiterHelper,
  getWaitersBySellerIdHelper,
};
export default waiterService;
