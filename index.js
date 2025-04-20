import axios from 'axios';

const {data, error} = await axios.post('http://localhost:3000/api/auth/signup', { name: 'sunil', email: 'sunil@mahmia', password: '12345678' });

console.log(data, error);