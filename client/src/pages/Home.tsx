import React, { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { getProfileThunkAction } from '../store/reducers/auth_reducer';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfileThunkAction());
  }, [dispatch])

  return (
    <div>Home</div>
  )
}
