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
      <div className="customLogo absolute   ">
        <Link className="block flex-shrink-0 lg:hidden" to="/">
          <svg
            width="32"
            height="32"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_233_423)">
              <path
                d="M48 43.4691V48H43.4691L24 28.5309L4.53094 48H0V43.4691L19.4691 24L0 4.53094V0H4.53094L24 19.4691L43.4691 0H48V4.53094L28.5309 24L48 43.4691ZM28.7597 0L24 4.75969L19.2403 0H11.0531L23.9991 12.9459L36.9459 0H28.7588H28.7597ZM36.9469 48L24.0009 35.0541L11.055 48H19.2422L24.0019 43.2403L28.7616 48H36.9487H36.9469ZM48.0009 28.7597L43.2412 24L48.0009 19.2403V11.0531L35.055 23.9991L48.0009 36.945V28.7578V28.7597ZM0 36.9459L12.9459 24L0 11.0541V19.2413L4.75969 24.0009L0 28.7597V36.9469V36.9459Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_233_423">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>

      <div className="flex flex-grow items-center justify-between  px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex w-full items-center justify-between gap-2 sm:gap-4 lg:hidden">
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
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
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
        </div>
      </div>
    </header>
  );
};

export default Header;
