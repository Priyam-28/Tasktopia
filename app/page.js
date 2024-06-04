'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase/config';
import { signOut } from 'firebase/auth';
import { addDoc, arrayUnion, collection, doc, getDocs, updateDoc } from '@firebase/firestore';
import Link from 'next/link';
import toast from 'react-hot-toast';
import TaskCard from '@components/Card';



const Home = () => {


  const [authUser] = useAuthState(auth);
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', time: Date.now() });

  useEffect(() => {
    const fetchTasks = async () => {
      const taskCollection = collection(firestore, 'tasks');
      const snapshot = await getDocs(taskCollection);
      const taskData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskData);
    };
    fetchTasks();
  }, []);
  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!newTask.title.trim() || !newTask.description.trim() ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const taskDoc = await addDoc(collection(firestore, 'tasks'), newTask);
      setTasks(prevTasks => [...prevTasks, { id: taskDoc.id, ...newTask }]);

      if (authUser) {
        const userDocRef = doc(firestore, 'users', authUser.uid);
        await updateDoc(userDocRef, {
          tasks: arrayUnion(taskDoc.id)
        });
      }

      setNewTask({ title: '', description: '', time: '' });
      toast.success("Task added successfully!");
    } catch (error) {
      console.error('Error adding task: ', error.message);
      toast.error("Error adding task");
    }
  };

  return (
    <>
      <section className='w-full flex-center flex-col'>
        <h1 className="head_text text-center text-6xl">
          Boost your productivity

          <br className="max-md:hidden" />
          <span className="green_gradient text-center">Manage Your Tasks</span>
          <p className="desc text-center">
            Boost your productivity: create, edit, and delete tasks with ease, ensuring consistency and efficiency
          </p>
        </h1>

      </section>
      <section className='w-full max-w-full flex-center flex-col'>

        <form className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Title of your Task
            </span>
            <input
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              type='text'
              placeholder='Planned to...'
              required
              className='form_input' />
          </label>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Description
            </span>

            <textarea
              placeholder='Describe Your Task in Brief'
              required
              className='form_textarea '
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          </label>

          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href='/' className='text-gray-500 text-sm'>
              Cancel
            </Link>

            <button
              type='button'
              onClick={handleAddTask}
              className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            >
              Add Task

            </button>
          </div>
        </form>


      </section>
      <div className="mt-16 prompt_layout">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
           />
      ))}

    </div></>

  )
}

export default Home
