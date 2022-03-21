const ControllerStudentName = require('../controller/studentName')

const { authenticateToken } = require('../middleware/auth');


const nodemail = require("../nodeemail/nodeemail")

const express = require("express");

const router = express.Router();

router.get("/:name",ControllerStudentName.search)
router.get("/aggrate",ControllerStudentName.getAggrate)


router.get("/insert", ControllerStudentName.insert_many);

// router.get("/:id", authenticateToken,ControllerStudentName.getById);


// router.get("/:id", ControllerStudentName.getById);


router.post("/", ControllerStudentName.create);
router.post("/login", ControllerStudentName.login);
router.get("/", ControllerStudentName.get);
// router.patch("/:id", ControllerStudentName.patch);
// router.delete("/:id", ControllerStudentName.deleteData);
router.post("/mail",nodemail.sendmail)






// // router.get("/",authenticateToken ,ControllerUser.get);  //get all data------------------



// router.get("/search/:findUserName", ControllerUser.search);// search data by order name

// router.get("/",ControllerUser.get_mach_data);// get by usin in oprater

// // router.get("/limit",ControllerUser.limitPage)





module.exports = router;
