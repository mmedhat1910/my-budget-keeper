import Link from 'next/link';
import React from 'react';
import styles from '../styles/Home.module.css';
import { ClockIcon } from '@heroicons/react/outline';
import BottomNav from './BottomNav';
interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      Navbar Here
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
