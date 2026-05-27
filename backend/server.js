const app = require('./src/app.js');
require('dotenv').config();
const connect = require('./src/config/db.js');
connect();

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});