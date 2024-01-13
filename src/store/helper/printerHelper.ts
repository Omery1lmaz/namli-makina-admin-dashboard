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


const getPrinters = async () => {
  const response = await axiosInstance.get(
    'http://localhost:4000/api/printer',
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const addPrinter = async ({ printer }: any) => {
  console.log('user deneme', printer);
  const response = await axiosInstance.post(
    'http://localhost:4000/api/admin/printer',
    printer,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getLocalPrinters = async () => {
  const response = await axiosInstance.get(
    'https://localhost:7237/api/Adision'
  );
  console.log('response data ', response.data);
  return response.data;
};

const updatePrinters = async ({ printers }: any) => {
  const response = await axiosInstance.post(
    'http://localhost:4000/api/printer/update',
    { printers },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const printerService = {
  addPrinter,
  getPrinters,
  getLocalPrinters,
  updatePrinters,
};
export default printerService;
