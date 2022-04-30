import React from 'react';
import styles from '../styles/Home.module.css';
interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      Navbar Here
      {children}
      <footer className={styles.footer}>
        <a
          href="https://mohamedmedhat.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>Mohamed Medhat &trade;</span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
