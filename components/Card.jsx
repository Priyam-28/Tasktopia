'use client'


import { auth } from '@app/firebase/config';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';


const TaskCard = ({task,handleEdit,handleDelete}) => {
  const [authUser] = useAuthState(auth);

  const pathName = usePathname();
  

  return (
    <div className='prompt_card'>
      

      <p className='my-4 font-satoshi text-sm text-gray-700'>{task.description}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        
      >
        {task.title}
      </p>

      {authUser?  (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      ):<h2>SignIN</h2>}
      
    </div>
  )
}

export default TaskCard
