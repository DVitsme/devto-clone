// LOGIC: check if mobile then render based on if the user is logged in or not components are below

import { useContext } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import UserContext from '../../context/userContext';

const AuthConditional = ({ isMobile }) => {
  const { user, username } = useContext(UserContext);

  if (isMobile) {
    return (
      <>
        {username ? (
          <MobileIsAuth user={user} username={username} />
        ) : (
          <MobileNotAuth />
        )}
      </>
    );
  } else {
    return (
      <>
        {user ? (
          <DesktopIsAuth user={user} username={username} />
        ) : (
          <DesktopNotAuth />
        )}
      </>
    );
  }
};

const DesktopIsAuth = ({ user, username }) => {
  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Link href="/admin">
        <a className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Create Posts
        </a>
      </Link>
      <div className="flex-shrink-0">
        <Link href={`/${username || user.email}`}>
          <a className="block relative ml-6">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-11 w-auto "
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

const DesktopNotAuth = () => {
  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Link href="/enter">
        <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
          Sign in
        </a>
      </Link>

      <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        Sign up
      </a>
    </div>
  );
};

const MobileIsAuth = ({ user, username }) => {
  return (
    <div>
      <a
        href="#"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign up
      </a>
      <p className="mt-6 text-center text-base font-medium text-gray-500">
        Existing customer?{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-500">
          Sign in
        </a>
      </p>
    </div>
  );
};
const MobileNotAuth = () => {
  return (
    <div>
      <a
        href="#"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign up
      </a>
      <p className="mt-6 text-center text-base font-medium text-gray-500">
        Existing customer?{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-500">
          Sign in
        </a>
      </p>
    </div>
  );
};
export default AuthConditional;
