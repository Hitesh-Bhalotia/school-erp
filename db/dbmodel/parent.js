const mongoose = require('mongoose')

const ParentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    student: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    class:{
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Parent = mongoose.model('Parent', ParentSchema)

module.exports = Parent