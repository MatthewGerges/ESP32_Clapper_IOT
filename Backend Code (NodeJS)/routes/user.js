const express = require('express');
//express validator gives us middleware function we can use to 
//validate incoming data
const {check} = require('express-validator')

const router = express.Router();
//why do you use brackets here?
const {createUser, userSignIn} = require('../controllers/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');
const {isAuth} = require('../middlewares/auth')

const User = require('../models/user');

const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
        //don't do a callback and move on (true)
    }
    else{
        cb('invalid image file!', false);
        //don't move on
    }
}

const uploads = multer({storage, fileFilter})

//used to be app but now it's router
//can add handlers to router.post??
router.post('/create-user', validateUserSignUp, userValidation, createUser);

// router.post('/create-user', check('firstname').trim().not().isEmpty,
// createUser);

//router.post('/sign-in', (req, res))
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn)

router.post('/create-post', isAuth, (req, res) => {
    res.send('welcome you are in secret route');
});

//isAuth amd things in between route and (req, res) are our middleware functions

//{profile: 'image} //this is why we do uploads.single('profile'). 
//I think it's cuz we're getting the profile key

//using async so we can use then and catch and because sharp is async
//if we use uploads.single, we can get the image from req.file
//sharp lets us resize image
router.post('/upload-profile', isAuth, uploads.single('profile'), async (req, res) => {
    const {user} = req;
    //same thing as doing user = req.user 
    if(!user) return res.status(401).json({success: false, message: 'unathorized access!'});

    // const profileBuffer = req.file.buffer
    // const imageInfo = await sharp(profileBuffer).metadata()
    // console.log(imageInfo);
    // res.send('ok')

    try {
        const profileBuffer = req.file.buffer;
        const {width, height} = await sharp(profileBuffer).metadata();
        const avatar = await sharp(profileBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer();

        //doing a console.log(avatar) here lets us see the buffer data

        await User.findByIdAndUpdate(user._id, {avatar});
        res.status(201).json({success: true, message: 'Your profile has updated!'})
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: 'server error, try after some time' });
        console.log('Error while uploading profile image', error.message);
      }
})

module.exports = router;

//when resizing image need to convert to buffer
//because storing avatar as buffer data