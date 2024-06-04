'use client'
import Login from '@components/Login'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { signOut } from 'firebase/auth';

const Home = () => {
  const userSession = sessionStorage.getItem('user');
  const [user] = useAuthState(auth);
  const router = useRouter();
  if (!user && !userSession) {
    router.push('/signin')
  }
  return (
    <section className='w-full flex-center flex-col'>
      <span className="head_text text-center text-6xl ">Hello </span>
      <button onClick={() => {
        signOut(auth)
        sessionStorage.removeItem('user')
        }}>
        Log out
      </button>

    </section>
  )
}

export default Home
