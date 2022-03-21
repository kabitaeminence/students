const mongoose = require("mongoose");
const Schema = mongoose.Schema

const studentSchema = new mongoose.Schema({

    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },

   
    city: {
        type: String,
    },

    state: {
        type: String,
    },

    pin:{
        type:Number
    }

})
const studentAddress = mongoose.model("studentAddress", studentSchema)
module.exports = studentAddress
