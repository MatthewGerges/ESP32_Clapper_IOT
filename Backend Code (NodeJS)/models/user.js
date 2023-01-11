const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//a schema is a blueprint and you store users according to that blueprint

const user = {
    fullname: '',
    email: '',
    password: '',
    avatar: ''
}

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: Buffer,
})
//avatar: Buffer is shorthand for:    
//  avatar: {
//         type: Buffer,
//     }
//Buffer is a special type of data type
//required: false is the default
//setting unique: true prevents duplicate users

Esp32Clapper: {
    users: [
        {name: 'Any name', email: 'myEmail'},
        {phone: 'phone no'}
    ]
}

//pre runs before we 'save' user nad hashes it when it is modified
userSchema.pre('save', function(next) {
    if(this.isModified('password'))
    {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
})

//the user we use on the method below is the user we got from user =  User.findOne({email})
//then we do user.comparePassword
userSchema.methods.comparePassword = async function(password){
    if(!password) throw new Error('Password is missing, can not compare');

    try {
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error) {
        console.log('Error while comparing password!', error.message)
    }
}

//statics lets you call function on the user schema coming from module.exports
//methods lets you call function on user schema coming from const user = await User({})
userSchema.statics.isThisEmailInUse = async function(email) {

    if(!email) throw new Error('Invalid Email')

    try {
    const user = await this.findOne({email})
    if(user) return false
        
    return true
} catch (error) {
    console.log('error inside isThisEmailInUse method', error.message)
    return false
}
}

//how to know whether to wrap in normal function or arrow function?
// userSchema.methods.isThisEmailInUse

module.exports = mongoose.model('User', userSchema);