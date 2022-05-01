import { MenuAlt2Icon, MoonIcon, SunIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import ThemeToggler from './ThemeToggler';

const Navbar = () => {
  return (
    <div className="flex justify-between px-6 h-20 w-full items-center">
      <MenuAlt2Icon className="w-6" />
      <p className="text-cyan-500 font-medium text-2xl">Logo</p>
      <div>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default Navbar;
