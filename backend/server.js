let express = require('express');
let cookieParser = require('cookie-parser');
require('dotenv').config();

let authRoute = require('./routes/auth.route');
let messageRoute = require('./routes/message.route');
let userRoute = require('./routes/user.route');

let dbConnect = require('./config/database');

let app = express();
let PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoute);

dbConnect();

app.listen(PORT, () => {
    console.log(`App is listening at port: ${PORT}`);
})