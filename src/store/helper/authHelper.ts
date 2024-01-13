import axios from 'axios';
import Cookies from 'js-cookie';
// const axiosInstance = axios.create({
//   withCredentials: true, // CSRF token'ını cookie'den almak için bu ayarı etkinleştirin
//   xsrfCookieName: 'XSRF-TOKEN', // Sunucudan alınan token'ı cookie'den okumak için kullanılan isim
//   xsrfHeaderName: 'X-XSRF-TOKEN', // CSRF token'ını istek başlığına eklemek için kullanılan isim
// });
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

const login = async (user: any) => {
  console.log('user deneme', user);
  const response = await axiosInstance.post(
    'http://localhost:4000/api/admin/login',
    user,
    {
      withCredentials: true,
    }
  );
  console.log('response data ', response.data);
  return response.data;
};

const sellerWorkingStatus = async (isWorking: any) => {
  const response = await axiosInstance.post(
    'http://localhost:4000/api/admin/is-working',
    { isWorking: !isWorking }
  );
  return response.data;
};

const getInfoHelper = async () => {
  const response = await axiosInstance.get(
    'http://localhost:4000/api/users/info',
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const getSellerInfoHelper = async (id: any) => {
  const response = await axiosInstance.get(
    `http://localhost:4000/api/users/info/${id}`
  );
  return response.data;
};

const updateUserProfileHelper = async (profile: any) => {
  const response = await axiosInstance.post(
    'http://localhost:4000/api/admin/profile',
    { profile: profile },
    { withCredentials: true }
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const updateUserImageHelper = async ({ formData }: any) => {
  const response = await axiosInstance.post(
    'http://localhost:4000/api/users/image',
    formData,
    { withCredentials: true }
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const register = async (user: any) => {
  const response = await axiosInstance.post(
    'http://localhost:4000/api/users/register',
    user
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const resetPasswordLink = async (email: any) => {
  console.log(email);
  const response = await axiosInstance.post(
    'http://localhost:4000/api/users/reset-password',
    { email }
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const resetPasswordVerify = async ({ id, token, password }: any) => {
  const response = await axiosInstance.post(
    `http://localhost:4000/api/users/reset-password/${id}/${token}`,
    { password }
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const VerifyUser = async ({ id, token }: any) => {
  const response = await axiosInstance.post(
    `http://localhost:4000/api/users/verify/${id}/${token}`
  );

  if (response.data) {
    console.log(response.data + 'data');
  }
  return response.data;
};

const updatePasswordHelper = async ({
  oldPassword,
  newPassword,
  newPasswordConfirm,
}: any) => {
  const response = await axiosInstance.post(
    'http://localhost:4000/api/users/update-password',
    {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    },
    { withCredentials: true }
  );

  if (response.data) {
  }
  return response.data;
};

const GetUserDetails = async () => {
  const response = await axiosInstance.post(
    'http://localhost:4000/api/admin/details',
    {},
    { withCredentials: true }
  );

  if (response.data) {
  }
  return response.data;
};

const GetSellers = async () => {
  const response = await axiosInstance.get(
    'http://localhost:4000/api/users/sellers'
  );
  return response.data;
};

const authService = {
  login,
  sellerWorkingStatus,
  GetUserDetails,
  register,
  resetPasswordLink,
  resetPasswordVerify,
  VerifyUser,
  GetSellers,
  getInfoHelper,
  updateUserProfileHelper,
  updateUserImageHelper,
  getSellerInfoHelper,
  updatePasswordHelper,
};
export default authService;
