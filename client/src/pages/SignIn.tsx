import React, { useEffect, useState } from 'react';
import { Input } from '../components/UI/Input';
import { loginThunkAction, signupThunkAction } from '../store/reducers/auth_reducer';
import { setError, useAppDispatch, useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Error } from '../components/UI/toast/Error';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.URIShortner);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const resultAction = await dispatch(signupThunkAction(inputs));
        if (signupThunkAction.fulfilled.match(resultAction)) 
          navigate('/');
      } else {
        const resultAction = await dispatch(loginThunkAction(inputs));
        if (loginThunkAction.fulfilled.match(resultAction))
          navigate('/');
      }
    } catch (err) {
        console.log(err);
    } finally {
        if(error){
          toast.custom((t) =><Error toastIn={t} message={error}/>);
          dispatch(setError(null));
        }
    }
  }
  useEffect(() => {
    if(user) navigate('/');
  }, [user, navigate]);
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-800'>
          {isSignup ? 'SignUp' : 'Login'} <span className='text-xl font-extrabold bg-blue-700 text-white p-2 rounded-xl'><span className='bg-white text-blue-700 p-2 rounded-xl'>NaNo</span>URI</span>
        </h1>
        <br />
        <form onSubmit={handleFormSubmit}>
          {isSignup && <Input type='text' label='Name' placeholder='Enter Your Name...' value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />}
          <Input type='email' label='Email' placeholder='Enter Your Email...' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
          <Input type='password' label='Password' placeholder='Enter Your Password...' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
          <div>
            <button className='btn btn-block btn-sm mt-2 bg-orange-500 border-white' onClick={() => setIsSignup((prev) => !prev)}>
              {isSignup ? 'Already have account?' : 'Dont have account?'}
            </button>
          </div>
          <div>
            <button className='btn btn-block btn-sm mt-2 bg-teal-600 border-white' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span>: isSignup ? 'SignUp' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
