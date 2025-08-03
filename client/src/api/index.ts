import axios from 'axios';
import { login_payload_datatype, signup_payload_datatype } from '../Types/types';


export const signUP = ( formData: signup_payload_datatype ) => axios.post('/api/auth/signup', formData);
export const logIn = ( formData: login_payload_datatype) => axios.post('/api/auth/login', formData);
export const logOut = () => axios.get('/api/auth/logout');
export const getProfile = () => axios.get('/api/auth/profile');