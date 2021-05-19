const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error('Incorrect email')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6){
                throw Error("Password should be greater than 6")
            }else if(value === 'password'){
                throw Error("Password cannot be password")
            }
        }
    },
    age:{
        type: Number,
        default: 0
    }
})

userSchema.statics.findByCredentials = async (email, password)=>{
    const user =  await User.findOne({email:email})

    if(!user){
        console.log('No user')
        throw new Error("No such user")
    }

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid){
        throw new Error("Login failed")
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){ //to check if the password fieild was modified. Advantage of mongoose
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('Users', userSchema)




module.exports = User