const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    academicYear: {
        type: String
    },
    class: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student