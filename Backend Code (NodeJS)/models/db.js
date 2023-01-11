const mongoose = require('mongoose');
//use .then because connecting to database is asynchronous task

//Code to connect mongoDB database to backend server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
        console.log('our db is connected');
    }).catch(err => console.log(err.message));