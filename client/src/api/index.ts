import axios from 'axios';

export interface signUPDataType {
    name: string,
    email: string,
    password: string
};
export interface logINDataType {
    email: string,
    password: string
};

export const signUP = ( formData: signUPDataType ) => axios.post('/api/auth/signup', formData);
export const logIn = ( formData: logINDataType) => axios.post('/api/auth/login', formData);
export const logOut = () => axios.get('/api/auth/logout');
export const getProfile = () => axios.get('/api/auth/profile');