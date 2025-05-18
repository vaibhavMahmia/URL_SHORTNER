import React, { useEffect } from 'react'
import { useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.URIShortner);
  const navigate = useNavigate();
  useEffect(() => {
      if(!user) navigate('/');
    }, [user, navigate]);
  return (
    <div>Profile</div>
  )
}
