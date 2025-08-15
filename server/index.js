import path from "path";
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.routes.js';
import shortnerRoute from './routes/shortner.routes.js';

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use('/api/auth', authRoute);
app.use('/api/shortner', shortnerRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});