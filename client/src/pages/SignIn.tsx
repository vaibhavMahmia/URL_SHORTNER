import React, { useEffect, useState } from 'react';
import { Input } from '../components/UI/Input';
import { loginThunkAction, signupThunkAction } from '../store/reducers/auth_reducer';
import { useAppDispatch, useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Error } from '../components/UI/toast/Error';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.URIShortner);
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
        await dispatch(signupThunkAction(inputs)).unwrap();
        navigate('/');
      } else {
        await dispatch(loginThunkAction(inputs)).unwrap();
        navigate('/');
      }
    } catch (err: unknown) {
      const errorMessage = typeof err === 'string'
        ? err
        : 'Something went wrong';
      console.log(errorMessage);
      toast.custom((t) => (
        <Error toastIn={t} message={errorMessage} />
      ));
    }
  }

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);



  return <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 bg-gray-700/40'>
      <h1 className='text-3xl font-semibold text-center text-gray-200'>
        {isSignup ? 'SignUp' : 'Login'} <span className='text-xl font-extrabold bg-teal-700 text-white p-2 rounded-xl'><span className='bg-white text-teal-700 p-2 rounded-xl'>NaNo</span>URI</span>
      </h1>
      <br />
      <form onSubmit={handleFormSubmit}>
        {isSignup && <Input type='text' label='Name' placeholder='Enter Your Name...' value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />}
        <Input type='email' label='Email' placeholder='Enter Your Email...' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
        <Input type='password' label='Password' placeholder='Enter Your Password...' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
        <br />
        <div>
          <button
            disabled={loading}
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition"
          >
            {loading ? (
              <span className="animate-spin border-2 border-white/40 border-t-white rounded-full w-4 h-4"></span>
            ) : null}
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
      <div>
        <button
          onClick={() => setIsSignup((prev) => !prev)}
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
        >
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
        </button>
      </div>
    </div>
  </div>;
}
