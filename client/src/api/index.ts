import axios from 'axios';

export interface signUPDataType {
    name: string,
    email: string,
    password: string
}

export const signUP = ( formData: signUPDataType ) => axios.post('/api/auth/signup', formData);