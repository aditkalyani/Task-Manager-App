const mongoose = require('mongoose')

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    //saving the user who created it
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users' //Users is basically the name of the document whcih we are referring
    }
})

module.exports = Tasks