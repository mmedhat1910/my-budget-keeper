import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { ClockIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';
import BottomNav from './BottomNav';
import Switch from 'rc-switch';
import Navbar from './Navbar';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import ReactLoading from 'react-loading';
interface Props {
  children: JSX.Element[] | JSX.Element;
  disableBottomNav?: boolean;
  disableNavbar?: boolean;
}

const Layout: React.FC<Props> = ({
  children,
  disableBottomNav,
  disableNavbar,
}) => {
  const token = getCookie('token');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router, token]);
  if (isLoading) {
    return (
      <div className="dark:bg-slate-700 flex items-center justify-center h-screen">
        <ReactLoading type={'spinningBubbles'} color="rgba(6 182 212)" />
      </div>
    );
  }
  return (
    <div className="bg-slate-50 dark:bg-slate-700 min-h-screen dark:text-white">
      {!disableNavbar && <Navbar />}

      <div>{children}</div>

      {!disableBottomNav && <BottomNav />}
    </div>
  );
};

export default Layout;

/* <footer className={styles.footer}>
        <a
          href="https://mohamedmedhat.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>Mohamed Medhat &trade;</span>
        </a>
      </footer> */
