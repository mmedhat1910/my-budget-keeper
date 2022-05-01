import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

const ThemeToggler = () => {
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
    <div onClick={() => toggleTheme()}>
      {theme === 'dark' ? (
        <SunIcon className="w-6" />
      ) : (
        <MoonIcon className="w-6" />
      )}
    </div>
  );
};

export default ThemeToggler;
