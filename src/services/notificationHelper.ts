import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successNotification = (message: string) => {
  toast.success(message);
};

const errorNotification = (message: string) => {
  toast.error(message);
};

const infoNotification = (message: string) => {
  toast.info(message);
};

export { successNotification, errorNotification, infoNotification };
