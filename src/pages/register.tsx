import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

export default function Register() {
    const serverUrl = process.env.SERVER_URL;
    const route = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repPassword, setRepPassword] = useState<string>("");
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [fname, setFName] = useState<string>();
    const [lname, setLName] = useState<string>();
    const [image, setImage] = useState<string>();
    const [wallet, setWallet] = useState<string>();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (password !== repPassword) {
            return
        }
        const credentials = { name: `${fname} ${lname}`, email, password, wallet, image };
        try {
            const response = await axios.post(serverUrl + "/signin", credentials)
            console.log("REGISTER RESPONSE:", response);
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
        <main className='bg-gray-50 bg-gray-900'>
            <div className='flex flex-col justify-center items-center py-8 px-6 mx-auto min-h-screen h-full'>
                <div className='justify-center items-center w-full rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-sm xl:p-0 bg-gray-800'>

                    <div className='p-6 w-full sm:p-8 lg:p-10'>

                        <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl text-white">
                            Hello world!
                        </h1>
                        <p className='mb-3 text-gray-500 text-gray-400'></p>
                        <form className='mt-8' onSubmit={e => handleSubmit(e)}>
                            <div className="mb-6 flex flex-row gap-5">
                                <label className=' mb-2 text-sm font-medium text-gray-900 text-white flex flex-col flex-1'>First Name
                                    <input required className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' type="text" id="first" name="email" value={fname} onChange={e => setFName(e.target.value)} />
                                </label>
                                <label className=' mb-2 text-sm font-medium text-gray-900 text-white flex flex-col flex-1'>Last Name
                                    <input required className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' type="text" id="last" name="email" value={lname} onChange={e => setLName(e.target.value)} />
                                </label>

                            </div>

                            <div className="mb-6">
                                <label className='block mb-2 text-sm font-medium text-gray-900 text-white'>Email</label>
                                <input required className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className='mb-6 relative'>
                                <label className='block mb-2 text-sm font-medium text-gray-900 text-white'>Password</label>
                                {hiddenPassword ? <input className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                                    : <input className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' type="text" id="password" name="text" value={password} onChange={e => setPassword(e.target.value)} />}
                                <button className='color-white w-[32px] h-[32px] absolute right-[1%] top-[35px]' onClick={() => setHiddenPassword(e => !e)}>
                                    {hiddenPassword ? <AiFillEyeInvisible className='text-white' /> : <AiFillEye className='text-white' />}
                                </button>
                            </div>  
                            <div className='mb-6 relative'>
                                <label className={'block mb-2 text-sm font-medium text-gray-900 text-white' + (repPassword !== password && repPassword.length > 0 ? " text-[#a40000] border-[#a40000] " : "")}>Password Again</label>
                                {hiddenPassword ? <input className={'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' + (repPassword !== password && repPassword.length > 0 ? " text-[#a40000] border-[#a40000] " : "")} type="password" id="reppassword" name="reppassword" value={repPassword} onChange={e => setRepPassword(e.target.value)} />
                                    : <input className={'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 border-blue-500' + (repPassword !== password && repPassword.length > 0 ? " text-[#a40000] border-[#a40000] " : "")} type="text" id="reppassword" name="text" value={repPassword} onChange={e => setRepPassword(e.target.value)} />}
                                <button className='color-white w-[32px] h-[32px] absolute right-[1%] top-[35px]' onClick={() => setHiddenPassword(e => !e)}>
                                    {hiddenPassword ? <AiFillEyeInvisible className='text-white' /> : <AiFillEye className='text-white' />}
                                </button>
                            </div>
                            <div className="mb-6">
                                <label className='block mb-2 text-sm font-medium text-gray-900 text-white'>Wallet</label>
                                <input required className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' type="text" id="wallet" name="wallet" value={wallet} onChange={e => setWallet(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label className='block mb-2 text-sm font-medium text-gray-900 text-white'>Image</label>
                                <input required className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' type="image" id="image" name="image" />
                            </div>
                            <button className='text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 bg-blue-700' type="submit">Sign in to account</button>
                            <div className="text-sm font-medium text-gray-500 text-gray-400">Already registered?
                                <Link className="ml-1 text-blue-700 hover:underline text-blue-500" href="/">
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
