import React, { useState } from 'react';
import { Input } from '../components/UI/Input';

export const SignIn: React.FC = () => {

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isSignup, setIsSignup] = useState(false);

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(inputs);
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                {isSignup ? 'SignUp' : 'Login'} <span className='text-accent'>nanoURI</span>
            </h1>
            <br />
            <form onSubmit={handleFormSubmit}>
                {isSignup && <Input type='text' label='Name' placeholder='Enter Your Name...' value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })}/>}
                <Input type='email' label='Email' placeholder='Enter Your Email...' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
                <Input type='password' label='Password' placeholder='Enter Your Password...' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
                <div>
                    <button className='btn btn-block btn-sm mt-2' onClick={() => setIsSignup((prev) => !prev)}>
                        {isSignup ? 'Already have account?' : 'Dont have account?'}
                    </button>
                </div>
                <div>
                    <button className='btn btn-block btn-sm mt-2'>
                        {isSignup ? 'SignUp' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
