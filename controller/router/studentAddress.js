const controllerStudentAddress= require("../controller/studentAddress");


const express = require("express");

const router = express.Router();

router.get ("/search/:city",controllerStudentAddress.search)

router.get("/:id", controllerStudentAddress.getById);

router.post("/", controllerStudentAddress.create);

router.get("/", controllerStudentAddress.get);
router.patch("/patch/:id", controllerStudentAddress.patch);
router.delete("/delete/:id", controllerStudentAddress.deleteData);



module.exports = router;
