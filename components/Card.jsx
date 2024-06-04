'use client';

import { auth } from '@app/firebase/config';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const TaskCard = ({ task, handleEdit, handleDelete }) => {
  const [authUser] = useAuthState(auth);

  return (
    <div className='prompt_card'>
      <p className='font-inter text-sm blue_gradient cursor-pointer'>
        CreatedOn: {task.time.day}-{task.time.month}-{task.time.year} Time: {task.time.hour}:{task.time.minute}
      </p>
      <p className='font-inter text-base orange_gradient cursor-pointer'>
        Title: {task.title}
      </p>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{task.description}</p>
      {authUser ? (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Completed
          </p>
        </div>
      ) : (
        <h2>SignIn</h2>
      )}
    </div>
  );
};

export default TaskCard;
