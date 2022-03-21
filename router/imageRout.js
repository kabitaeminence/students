const imgUplodControler = require("../controller/imagecontroller")

const express = require("express");

const router = express.Router();

router.post('/',imgUplodControler.uploadImg.single("img"),imgUplodControler.imageController);

module.exports = router;
