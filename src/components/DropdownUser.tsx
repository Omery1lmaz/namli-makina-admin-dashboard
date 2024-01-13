import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserOne from '../images/user/user-01.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const navigate = useNavigate();
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  // @ts-expect-error
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="relative">
      <Link
        ref={trigger}
        className="flex items-center gap-4"
        to="#"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name ? user.name : null}
          </span>
        </span>

        <span className=" flex rounded-full">
          <UserIcon width={30} />
          {dropdownOpen ? (
            <ChevronUpIcon width={20} />
          ) : (
            <ChevronDownIcon width={20} />
          )}
        </span>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          {user && (
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <UserIcon width={20} />
                My Profile
              </Link>
            </li>
          )}
          {/* {!user.name && ( */}
          {!user && (
            <li>
              <Link
                to="/auth/signin"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <ArrowRightOnRectangleIcon width={20} />
                Sign In
              </Link>
            </li>
          )}
          {/* )} */}
        </ul>
        {user && (
          <button
            className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            onClick={() => {
              Cookies.remove('connect.sid');
              navigate('/auth/signin');
            }}
          >
            <ArrowLeftOnRectangleIcon width={20} />
            Log Out
          </button>
        )}
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
