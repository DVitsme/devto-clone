import { Toaster } from 'react-hot-toast';

import Navbar from '../components/Navbar/Index';
import UserContext from '../context/userContext';

import 'tailwindcss/tailwind.css';
import { useUserData } from '../hooks/useUserData';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
