const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Incorrect email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw Error("Password should be greater than 6")
            } else if (value === 'password') {
                throw Error("Password cannot be password")
            }
        }
    },
    age: {
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//used to avoid sending password and token to user
userSchema.methods.getPublicProfileData = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}

userSchema.methods.generateUserToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'jwtsecretkey')

    user.tokens.push({ token })

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error("No such user")
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new Error("Login failed")
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) { //to check if the password field was modified. Advantage of mongoose
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('Users', userSchema)




module.exports = User