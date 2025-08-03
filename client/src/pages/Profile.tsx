import React, { useEffect } from 'react'
import { useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.URIShortner);
  const navigate = useNavigate();
  console.log('User: ', user)
  useEffect(() => {
    if (!user) navigate('/signin');
  }, [user, navigate]);
  // Helper to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full min-h-screen items-stretch justify-center bg-white/30 backdrop-blur-md p-1">
      <div className="flex-1 flex flex-col items-center justify-center  p-8 m-0 min-h-[350px]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-teal-400 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-md">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.name}</h2>
          <p className="text-gray-500 text-sm mb-2">{user?.email}</p>
        </div>
        <div className="w-full border-t border-gray-200 my-3"></div>
        <div className="w-full flex flex-col gap-2 text-gray-700 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Member since:</span>
            <span>{user?.createdAt ? formatDate(user.createdAt) : '-'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Last profile update:</span>
            <span>{user?.updatedAt ? formatDate(user.updatedAt) : '-'}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center  p-8 m-0 min-h-[350px]">
        col 2
      </div>
    </div>
  );
}
