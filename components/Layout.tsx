import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { ClockIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';
import BottomNav from './BottomNav';
import Switch from 'rc-switch';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.theme);
    }
  }, []);
  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      if (theme === 'light') {
        window.localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
        setTheme('dark');
      } else {
        window.localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
        setTheme('light');
      }
    }
  };
  return (
    <div className="bg-slate-50 dark:bg-slate-700 min-h-screen dark:text-white">
      <div className="flex justify-between px-6 h-20 w-full items-center">
        <p className="text-cyan-500 font-medium text-2xl">Logo</p>
        <div>
          <div onClick={() => toggleTheme()}>
            {theme === 'dark' ? (
              <SunIcon className="w-6" />
            ) : (
              <MoonIcon className="w-6" />
            )}
          </div>
        </div>
      </div>
      {children}
      {/* <footer className={styles.footer}>
        <a
          href="https://mohamedmedhat.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>Mohamed Medhat &trade;</span>
        </a>
      </footer> */}
      <BottomNav />
    </div>
  );
};

export default Layout;
