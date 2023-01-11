const User = require('../models/user')

const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    //destructure full name
    const {fullname, email, password} = req.body

    //console.log(req.body)

    //send request back to user
    //sending a res.json here is basically like a return statement that
    //prevents the execution of any further code
    
    //res.json(req.body);

    //since we're setting req.body = to our json payoad in app.use above
    // User.findOne({email: email coming from frontEnd})

   const isNewUser = await User.isThisEmailInUse(email)

   if(!isNewUser) return res.json({success: false, message: 'This email is already in use, try sign-in'})

   const user = await User({
        fullname,
        email,
        password
    })
    await user.save();
    res.json(user);

    //await must be used because it's an async function - b/c we're waiting for user?
}

exports.userSignIn = async (req, res) => {
    const {email, password} = req.body
    // res.send('sign in')
    const user = await User.findOne({email})

    if(!user) return res.json({success: false, message: 'user not found with the given email'})

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.json({success: false, message: 'email / password does not match!'})

    const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    
    res.json({success: true, user, token})
}