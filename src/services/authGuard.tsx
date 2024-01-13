import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserDetails, deleteUser } from '../store/authenticationSlices';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { LargeCircularProgressBar } from '../components/progressBar/circularProgressBar';

const GuardedRoute = ({ component: Component, auth, ...rest }: any) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: any) => state.auth);
  const token = Cookies.get('token');

  useEffect(() => {
    // @ts-ignore
    dispatch(GetUserDetails());
  }, []);
  return (
    <>
      {token ? <Component /> : <NavigateToPreviusPage />}
      {/* {!token && <Navigate to="/auth/signin" />} */}
      {!token && !isLoading && <NavigateToPreviusPage />}
      {!token && isLoading && <LargeCircularProgressBar />}
    </>
  );
};

const NotGuardedRoute = ({ component: Component, auth, ...rest }: any) => {
  const { isLoading } = useSelector((state: any) => state.auth);
  const token = Cookies.get('token');

  return (
    <>
      {!token ? <Component /> : <NavigateToPreviusPage />}
      {/* {!token && <Navigate to="/auth/signin" />} */}
      {token && !isLoading && <NavigateToPreviusPage />}
    </>
  );
};

const NavigateToPreviusPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const previousPage = document.referrer;
    console.log(previousPage, 'previous page');
    navigate('/auth/signin');
  }, []);

  return (
    <div>
      <LargeCircularProgressBar />
    </div>
  );
};
export { NotGuardedRoute };
export default GuardedRoute;
