const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema

const studentSchema = new mongoose.Schema({
    Name: {
        type: String,
    },

    age:{
        type:Number

    },

    email: {
        type: String,
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("invalide Email")
            }
        }

    },
    password: {
        type: String,
        unique: true
    }

})
const student = mongoose.model("student", studentSchema)
module.exports = student