import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa';
import { FaCircleUser } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from '../../store';
import { getProfileThunkAction, logoutThunkAction } from '../../store/reducers/auth_reducer';

export const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector((state) => state.URIShortner);
    const loggedIn: string | null = localStorage.getItem('loggedIn');
    useEffect(() => {
        if(loggedIn)
            if(JSON.parse(loggedIn))
                dispatch(getProfileThunkAction());
    }, [dispatch, loggedIn]);

    return (
        <div className="navbar text-gray-800 w-full p-1 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <div className="navbar-start p-2 gap-2">
                {user && 
                <div className="dropdown text-gray-800">
                    <div tabIndex={0} role="button" className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700 text-xl font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li className='text-xl text-gray-800 font-bold'><Link to={'/profile'}><span className='text-teal-600'><FaCircleUser/></span>{user.name}</Link></li>
                    </ul>
                </div>}
                <ul>
                    <li className="text-xl font-extrabold bg-blue-700 text-white p-2 rounded-xl"><Link to={'/'}><span className='bg-white text-blue-700 p-2 rounded-xl'>NaNo</span>URI</Link></li>
                </ul>
            </div>
            {user &&
            <div className="navbar-center hidden lg:flex text-neutral-content">
                <ul className="menu menu-horizontal px-1 bg-gray-300 rounded-2xl">
                <li className='text-xl text-gray-800 font-bold'><Link to={'/profile'}><span className='text-teal-600'><FaCircleUser/></span>{user.name}</Link></li>
                </ul>
            </div>}

            <div className="navbar-end p-2">
                {user ? (
                    <button className='btn btn-wide bg-gray-200 border-gray-200 shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 text-gray-800 font-extrabold' onClick={() => dispatch(logoutThunkAction())} disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span>: <span className='text-red-500 text-2xl'><FaSignOutAlt /></span>} Logout
                    </button>
                ) : (
                    <Link to="/signin" className='btn btn-wide bg-gray-200 border-gray-200 shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 text-gray-800 font-extrabold'>
                        <span className='text-teal-600 text-2xl'><FaCircleUser/></span>Sign In
                    </Link>
                )}

            </div>
        </div>
    )
}
