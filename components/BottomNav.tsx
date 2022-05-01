import { ClockIcon, HomeIcon, PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const BottomNav = () => {
  const router = useRouter();
  return (
    <div className=" w-full h-16 fixed bottom-0 bg-white dark:bg-slate-800 dark:text-white flex items-center justify-evenly rounded-t-2xl">
      <Link href={'/'} passHref>
        <span
          className={`flex flex-col items-center ${
            router.pathname === '/' ? 'text-cyan-500' : ''
          }`}
        >
          <HomeIcon className="w-6" />
          <p>Home</p>
        </span>
      </Link>

      <Link href="/transactions/create" passHref>
        <span className="bg-cyan-500 p-5 rounded-full text-white shadow-lg absolute -translate-y-1/2 ">
          <PlusIcon className="w-6" />
        </span>
      </Link>

      <Link href={'/transactions'} passHref>
        <span
          className={`flex flex-col items-center pl-24 ${
            router.pathname === '/transactions' ? 'text-cyan-500' : ''
          }`}
        >
          <ClockIcon className="w-6" />
          <p>History</p>
        </span>
      </Link>
    </div>
  );
};

export default BottomNav;
