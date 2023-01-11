// running node
// console.log(1+2);

const express = require('express');
require('dotenv').config();
require('./models/db');

const userRouter = require('./routes/user');
//does requiring it just automatically run the code in that file?

const User = require('./models/user');

const app = express();

//listen to post request
//how does it know what user object is - is it related to previous file or smtg
//or is it just a common but unrelated name?
//asynchronous tasks are tasks that don't need scheduling - they can run in parallel
//they are not dependent on others or on a predef'd sequence
//.then and .catch are also async operations
//req = data coming from frontend and res = response being sent to user


//expres server lets us use an app.use method to get body [path], [callback]

//if app function should only execute on '/path'
// app.use('/path', ()=>{})
//no path provided, app.use callback affects all code

// app.use((req, res, next) => {
//     req.on('data', (chunk) =>{
//         const data = JSON.parse(chunk);
//         req.body = data
//         //console.log(JSON.parse(chunk));
//         //without json.parse, we would just get a buffer with hexadecimals
//         next();
//     })
//     // next();
//     //next is a decider that decides whether code should proceed to next logic
 
// })

//using express.json middleware to pass our incoming data to request.body
//does the same thing as the // app.use((req, res, next) => {...} above
app.use(express.json())
app.use(userRouter);
//app.post method that was here becomes router.post method under routes

const test = async(email, password) => {
    const user = await User.findOne({email: email});
    const result = await user.comparePassword(password);
    console.log(result);
}

test('johnny2@gmail.com', 'ski123456')

app.get('/test', (req, res) => {
    res.send('Hello world');
})



//can't test a post request with web browser because we're not listening to any GET reqs

//listen to home route
app.get('/', (req, res) => {
    //request (get data from front end), respone (send data to front end)
    res.send('<h1 style = "color red">We are up for business!</h1>')
    //second response doesn't go throughb - likea a return statement
    res.send('Hello World');
})

app.listen(8000, ()=> {
    console.log('port is listening');
});

//sign up with MongoDB Atlas = free; cluster = create cluster

// mongodb+srv://MatthewGerges:<password>@clapperforesp.byprz5r.mongodb.net/?retryWrites=true&w=majority

//.env works on key = value type logic - used for storing variables
//MVC pattern = model view and controller but no view will be written