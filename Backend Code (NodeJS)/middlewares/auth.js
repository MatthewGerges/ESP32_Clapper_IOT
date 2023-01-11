const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuth = async (req, res, next) => {
    //token will be contained in req.header
    if(req.headers && req.headers.authorization)
    {
        const token = req.headers.authorization.split(' ')[1]
        //this splits up the headers,authorization with a space and gets the second index (the 2nd 'word' after the space)
        //this is the actual token: JWT token_e_jljlj

  try {
	      const decode = jwt.verify(token, process.env.JWT_SECRET);
	
	        const user = await User.findById(decode.userID);
	        if(!user)
	        {
	            return res.json({success: false, message: 'unauthorized access!'})
	        }
	
	        req.user = user;
	        //why do we wanna change req.user?
	        next();
} catch (error) {
	if(error.name === 'JsonWebTokenError'){
        return res.json({success: false, message: 'unauthorized access!'});
    }
	if(error.name === 'TokenExpiredError'){
        return res.json({success: false, message: 'session expired try sign!'});
    }

    res.json({success: false, message: 'Internal server error!'});
}
    }
    else{
        res.json({success: false, message: 'unauthorized access!'})
    }

    console.log(req.headers.authorization);
};

//add authorization = jwt as header