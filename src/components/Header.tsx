import { Link } from 'react-router-dom';
import Logo from '../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { sellerWorkingStatus } from '../store/authenticationSlices';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { user } = useSelector(
    // @ts-expect-error
    (state) => state.auth
  );
  const dispatch = useDispatch();
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between  py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="ml-auto flex items-center !justify-end gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <div>{JSON.stringify(user?.isWorking)}</div>
            <div className="col-span-1 flex items-center">
              <div className="flex items-center justify-center gap-2">
                <ul>
                  <li className="list-none ">
                    <label
                      className={`relative m-0 block h-7.5 w-14 rounded-full ${
                        user?.isWorking ? 'bg-meta-3' : 'bg-meta-1'
                      }`}
                      onClick={() => {}}
                    >
                      <input
                        type="checkbox"
                        onChange={() => {
                          dispatch(sellerWorkingStatus(user?.isWorking));
                        }}
                        className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <span
                        className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
                          user?.isWorking && '!right-[3px] !translate-x-full'
                        }`}
                      ></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            {/* <!-- Dark Mode Toggler --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
