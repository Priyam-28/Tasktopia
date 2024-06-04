'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth} from '@app/firebase/config';
import { signOut } from 'firebase/auth';

const Nav = () => {
    const [authUser] = useAuthState(auth);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image 
                    src='/assets/images/logo.svg' // Ensure this path is correct
                    alt='logo'
                    width={30}
                    height={30}
                    className='object-contain' 
                />
                <p className='logo_text'>Prompt Lab</p>
            </Link>

            {/* Desktop navigation */}
            <div className="sm:flex hidden">
                {authUser ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link className='black_btn' href="/create-prompt">
                            Create Task
                        </Link>
                        <button type='button' onClick={handleSignOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image
                                src='/assets/images/logo.svg' // Replace with profile image path
                                width={30}
                                height={30}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link href='/signin' className='black_btn mr-3'>
                            Login
                        </Link>
                        <Link href='/signup' className='outline_btn'>
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile navigation */}
            <div className="sm:hidden flex relative">
                {authUser ? (
                    <div className='flex'>
                        <Image
                            src='/assets/images/logo.svg' // Replace with profile image path
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        handleSignOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link href='/signin' className='black_btn'>
                            Login
                        </Link>
                        <Link href='/signup' className='outline_btn'>
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;
