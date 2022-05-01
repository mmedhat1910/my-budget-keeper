import {
  ExclamationCircleIcon,
  ExclamationIcon,
  EyeIcon,
  EyeOffIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import axios, { AxiosError } from 'axios';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FormEventHandler, useRef, useState } from 'react';
import ReactLoading from 'react-loading';
import Layout from '../../components/Layout';
import ThemeToggler from '../../components/ThemeToggler';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: '' as string,
  });
  const router = useRouter();
  const onLogin: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage({
        show: false,
        message: '',
      });
      setIsLoading(true);
      const { status, data } = await axios({
        method: 'post',
        url: '/api/auth/login',
        data: {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        },
      });
      setIsLoading(false);
      if (status === 200) {
        setCookies('token', data.token);

        router.push('/');
      }
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        setErrorMessage({
          show: true,
          message: error.response?.data?.message || 'Something went wrong',
        });
      } else {
        setErrorMessage({
          show: true,
          message: 'Something went wrong',
        });
      }
      console.log((error as Error).message);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col items-center h-screen justify-center w-full">
      <div className="w-full bg-white dark:bg-slate-700 h-full mx-auto overflow-hidden shadow-xl">
        <div className="relative h-2/5 bg-cyan-500 rounded-bl-4xl  text-white ">
          <svg
            className=" absolute  -bottom-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fillOpacity="1"
              className="fill-white dark:fill-slate-700"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
          <div className="p-5 flex w-full justify-between">
            <InformationCircleIcon className="w-6" />
            <ThemeToggler />
          </div>
          <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-2xl">
            LOGO HERE
          </p>
        </div>
        <div className="px-10 pt-4 pb-8  rounded-tr-4xl">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-50">
            Welcome back!
          </h1>
          <form className="mt-12" onSubmit={onLogin}>
            <div className="relative">
              <input
                required
                id="email"
                name="email"
                type="text"
                ref={emailRef}
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-cyan-600 dark:bg-slate-700 autofill:bg-transparent active:bg-transparent focus:bg-transparent autofill-red-400 dark:text-slate-50"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm dark:peer-focus:text-slate-50 dark:text-slate-50"
              >
                Email address
              </label>
            </div>
            <div className="mt-10 relative">
              <div className="flex  border-gray-300 border-b-2 focus:border-red-500 focus-within:border-cyan-600">
                <input
                  required
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  ref={passwordRef}
                  className="peer bg-transparent h-10 w-full   text-gray-900 placeholder-transparent focus:outline-none  dark:text-slate-50 "
                  placeholder="Password"
                />
                {showPassword ? (
                  <EyeIcon
                    className="w-6 dark:text-white mx-2 text-gray-500"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOffIcon
                    className="w-6 dark:text-white mx-2 text-gray-500"
                    onClick={() => setShowPassword(true)}
                  />
                )}
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm dark:peer-focus:text-slate-50 dark:text-slate-50"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="mt-10 h-2 flex items-center justify-center">
              {isLoading && <ReactLoading type="bubbles" color="#fff" />}
              {errorMessage.show && (
                <p className="text-red-500 italic flex items-center gap-2">
                  <ExclamationIcon className="w-6" />
                  {errorMessage.message}
                </p>
              )}
            </div>
            <button className="mt-10 px-4 py-2 rounded bg-cyan-500 active:bg-cyan-600 text-white font-semibold text-center block w-full cursor-pointer">
              Sign in
            </button>
          </form>
          <a
            href="#"
            className="mt-4 block text-sm text-center font-medium text-cyan-600 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {' '}
            {/* Forgot your password?{' '} */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const token = req.cookies.token;
  if (token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
  return { props: {} };
};
