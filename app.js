const express = require('express')
const app = express()
app.use(express.json())

const mongoose = require("mongoose");
// const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/Student", {
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiesTopology:true
}).then(() => {
    console.log("connection is successfully")
}).catch((err) => {
    console.log("no connection")
})
//app.use(express.static(__dirname + "/public"));
//app.use("/uploads/images", express.static("uploads/images"));

const StudentNameRouter = require('./router/studentName')
const studentBookName = require("./router/studentBookName")
const studentAddress = require("./router/studentAddress")

const imageRouter = require("./router/imageRout")



app.use(express.json());

app.use('/studentName', StudentNameRouter)

app.use('/BookName', studentBookName)

app.use('/studentAddress', studentAddress);

app.use('/uplodeImage', imageRouter)

app.listen(4000, (err) => {
    if (err) throw err;
    console.log('Server is running port number 4000--')
});


