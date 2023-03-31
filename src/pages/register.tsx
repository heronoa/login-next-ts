import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Register() {
    const serverUrl = process.env.SERVER_URL;
    const route = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [register, setRegister] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const credentials = { email, password };
        try {
            const response = await axios.post(serverUrl + "/signin", credentials)
            console.log("REGISTER RESPONSE:",response);
            if (response.status === 200) {
                console.log("SUCCESS");
                route.push("/");
            } else {
                throw new Error(response.data.errors[0].message)
            }
        } catch (error) {
            console.log("DEBUGGING ERROR", error);
            // result = error;
        }
        route.push("/");
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
                            <button className='text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 bg-blue-700' type="submit">Sign in to account</button>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Already registered?
                                <Link className="ml-1 text-blue-700 hover:underline dark:text-blue-500" href="/">
                                    Login with your account.
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
