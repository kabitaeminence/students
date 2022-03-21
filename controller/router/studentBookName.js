const ControllerStudentBook = require('../controller/studentBookName')


const express = require("express");

const router = express.Router();

router.get("/:id", ControllerStudentBook.getById);


router.post("/", ControllerStudentBook.create);
router.get("/", ControllerStudentBook.get);
router.patch("/patch/:id", ControllerStudentBook.patch);
router.delete("/delete/:id", ControllerStudentBook.deleteData);
router.post("/filter", ControllerStudentBook.filterdata);




module.exports = router;
