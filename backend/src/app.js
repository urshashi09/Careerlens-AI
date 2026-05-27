const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors(
    {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true
    }
));


//requiring the routes here
const authRouter= require('./routes/auth.route.js');
const interviewRouter= require('./routes/interview.routes.js');



//using the routes
app.use('/api/auth', authRouter);
app.use('/api/user', interviewRouter);



module.exports = app