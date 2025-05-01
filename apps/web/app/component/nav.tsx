"use client"
import React, { useEffect, useState } from 'react'
import { VscTerminalUbuntu } from 'react-icons/vsc'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Button from './ui/Button'

function Nav({ setLogin }: { setLogin: any }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [user, setUser] = useState(false)
    const [profile, setProfile] = useState(false);

    console.log('User session:', session?.user);

    useEffect(() => {
        if (status === 'authenticated') {
            setUser(true)
        }
    }, [status])

    return (
        <nav className='flex justify-between items-center relative z-0 bg-black px-4 py-2 rounded-xl'>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <div
                        onClick={() => {
                            router.push('/')
                        }}
                        className='flex gap-3 cursor-pointer'>
                        <div className='flex flex-col justify-center'>
                            <VscTerminalUbuntu size={40} />
                        </div>
                        <p className='flex flex-col justify-center text-3xl'>Exa</p>
                        <a className='flex items-center text-sm p-1 mt-1 rounded-full text-white cursor-pointer'>
                            Powered By <span className='font-bold pl-1'>exa.ai</span>
                        </a>
                    </div>
                    <div className='pl-5 flex items-center justify-center gap-6'>
                        <p>Why Exa</p>
                        <p>Pricing</p>
                    </div>
                </div>
            </div>

            {/* Show Sign In/Sign Up button or profile dropdown */}
            {!user ? (
                <button
                    onClick={() => {
                        setLogin(true)
                    }}
                    className='flex items-center bg-white p-2 rounded-full text-black cursor-pointer hover:-translate-y-0.5 transition-all duration-200 ease-in-out'>
                    SignIn/SignUp
                </button>
            ) : (
                <div className='relative z-0'>
                    <img
                        onClick={() => {
                            setProfile(prev => !prev)
                        }}
                        src={session?.user?.image || ""}
                        alt="user"
                        className='w-[30px] h-[30px] cursor-pointer hover:border-2 hover:border-white rounded-full'
                    />
                    {profile && (
                        <div className='absolute top-8 right-0 bg-white text-black p-4 rounded-xl w-40 shadow-md'>
                            <p className='text-sm'>{session?.user?.email}</p>
                            <button
                                onClick={() => signOut()}
                                className='mt-2 w-full bg-red-500 text-white p-2 rounded-full text-center'>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Nav;
