import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
  const serverUrl = process.env.SERVER_URL;
  const route = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const credentials = { email, password, rememberMe };
    try {
      const response = await axios.post(serverUrl + "/login", credentials);
      if (response.status === 200) {
        route.push("/");
      } else {
        throw new Error(response.data.errors[0].message);
      }
    } catch (error) {
      console.log("DEBUGGING ERROR", error);
      // result = error;
    }
    // route.push("/me");
  }

  return (
    <main className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col justify-center items-center py-8 px-6 mx-auto md:h-screen'>
        <div className='justify-center items-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-sm xl:p-0 dark:bg-gray-800'>

          <div className='p-6 w-full sm:p-8 lg:p-10'>

            <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
              Hello world!
            </h1>
            <p className='mb-3 text-gray-500 dark:text-gray-400'></p>
            <form className='mt-8' onSubmit={e => handleSubmit(e)}>
              <div className="mb-6">
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                <input required className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" id="first" name="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className='mb-6'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                {hiddenPassword ? <input className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="password" id="last" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                  : <input className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="password" id="last" name="text" value={password} onChange={e => setPassword(e.target.value)} />}
                <button className='color-white w-[32px] h-[32px]' onClick={() => setHiddenPassword(e => !e)}></button>
              </div>
              <div className="flex items-start mb-6"><div className="flex items-center h-5">
                <input id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
              </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-900 dark:text-white">
                    Remember me
                  </label>
                </div>
                <a className="ml-auto text-sm text-blue-700 dark:text-blue-500 hover:underline" href="/forgot-password">
                  Forgot Password?
                </a>
              </div>
              <button className='text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 bg-blue-700' type="submit">Sign in to account</button>
              <button className='text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 bg-red-700' onClick={() => {const response = axios.get(serverUrl + "/google/redirect"); console.log({response})}}>
                Sign with google
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Not registered?
                <Link className="ml-1 text-blue-700 hover:underline dark:text-blue-500" href="/register">
                  Create your account.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
