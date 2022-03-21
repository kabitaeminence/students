const express = require('express')
const app = express()
const multer  = require('multer')

const DIR = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
    console.log("image uploded in the folder");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const uploadImg = multer({

  storage: storage,
  fileFilter: (req, file, cb) => {
    req.file
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error("Please upload an Image!!"));
    }
    cb(undefined, true);
  },
});

const imageController=(req,res)=>{
  // console.log(req.body)
  try {
    return res.send({message:"hey image save successfully"})
  } catch (error) {
    console.log(error)
  }
}

  module.exports={uploadImg,imageController}
  
