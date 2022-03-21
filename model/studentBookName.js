const mongoose = require("mongoose");
const Schema = mongoose.Schema

const studentSchema = new mongoose.Schema({

    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },

    studentaddressId: {
        type: Schema.Types.ObjectId,
        ref: "studentAddress"
    },

    Hindi: {
        type: Number,
    },

    Scince: {
        type: Number,
    },

    math:{
        type:Number
    }

})
const studentBook = mongoose.model("studentBook", studentSchema)
module.exports = studentBook