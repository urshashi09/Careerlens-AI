require('dotenv').config();

const app= require('./src/app.js');

const connect= require('./src/config/db.js');
connect();



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});