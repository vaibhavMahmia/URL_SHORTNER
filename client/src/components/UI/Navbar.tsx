import React from 'react'
import { Link } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa';
import { FaCircleUser } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutThunkAction } from '../../store/reducers/auth_reducer';

export const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector((state) => state.URIShortner);

    return <div className="navbar text-gray-800 w-full p-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 min-h-0 h-12 bg-gray-500/60">
        <div className="navbar-start p-0 gap-1 min-h-0">
            {user &&
                <div className="dropdown text-gray-800">
                    <div tabIndex={0} role="button" className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700 text-xl font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li className='text-xl text-gray-800 font-bold'><Link to={'/profile'}><span className='text-teal-600'><FaCircleUser /></span>{user.name}</Link></li>
                    </ul>
                </div>}
            <ul>
                <li className="text-base font-extrabold bg-teal-700 text-white px-2 py-1 rounded-lg leading-tight"><Link to={'/'}><span className='bg-white text-teal-700 px-2 py-1 rounded-lg leading-tight text-base'>NaNo</span>URI</Link></li>
            </ul>
        </div>
        {user &&
            <div className="navbar-center hidden lg:flex text-neutral-content min-h-0">
                <ul className="menu menu-horizontal px-1 py-0.5 rounded-xl min-h-0">
                    <li className='text-base text-gray-800 font-bold leading-tight border-gray-800'><Link to={'/profile'}><span className='text-teal-600 text-lg align-middle'><FaCircleUser /></span><span className="align-middle">{user.name}</span></Link></li>
                </ul>
            </div>}

        <div className="navbar-end p-1 min-h-0 m-auto">
            {user ? (
                <button className='btn btn-flex btn-sm mt-2 bg-red-500 border-white font-bold min-h-0 h-8 px-3 py-1 text-sm' onClick={() => dispatch(logoutThunkAction())} disabled={loading}>
                    {loading ? <span className='loading loading-spinner w-4 h-4'></span> : <FaSignOutAlt />} Logout
                </button>
            ) : (
                <Link to="/signin" className='btn btn-flex btn-sm mt-2 bg-teal-600 border-white font-bold min-h-0 h-8 px-3 py-1 text-sm'>
                    <FaCircleUser /> Sign In
                </Link>
            )}
        </div>
    </div>;
}
