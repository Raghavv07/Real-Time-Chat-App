let mongoose = require('mongoose');
require('dotenv').config();

let dbConnect = function () {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("DB connect successfully"))
        .catch(() => {
            console.log("Issue in DB Connection");
            console.error(error.message);
            process.exit(1);
        })
}

module.exports = dbConnect;