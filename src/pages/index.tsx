import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const credentials = { email, password };
    console.log(credentials);
    const result = await axios.post("http://127.0.0.1:3333/login", credentials)
    console.log(result)
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
                <input className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" id="last" name="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button className='text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 bg-blue-700' type="submit">Sign in to account</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
