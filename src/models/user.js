const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('Users',{
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
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

module.exports = User