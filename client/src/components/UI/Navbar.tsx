import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa';
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
        <div className="navbar text-neutral-content w-full p-1 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <div className="navbar-start p-2 gap-2">
                {user && 
                <div className="dropdown text-neutral-content">
                    <div tabIndex={0} role="button" className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li className='text-lg text-blue-500 font-bold'><Link to={'/profile'}><span className='text-amber-50'>Logged In As: </span>{user.name}</Link></li>
                    </ul>
                </div>}
                <ul>
                    <li className="text-xl text-accent"><Link to={'/'}>nanoURI</Link></li>
                </ul>
            </div>
            {user &&
            <div className="navbar-center hidden lg:flex text-neutral-content">
                <ul className="menu menu-horizontal px-1">
                    <li className='text-lg text-blue-500 font-bold'><Link to={'/profile'}><span className='text-amber-50'>Logged In As: </span>{user.name}</Link></li>
                </ul>
            </div>}

            <div className="navbar-end p-2">
                {user ? (
                    <button className='btn btn-wide bg-error' onClick={() => dispatch(logoutThunkAction())} disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span>: <FaSignOutAlt />} Logout
                    </button>
                ) : (
                    <Link to="/signin" className='btn btn-wide'>
                        Sign In
                    </Link>
                )}

            </div>
        </div>
    )
}
