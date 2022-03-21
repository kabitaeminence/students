const studentName = require("../model/studentName")
const json_data = require("../studentsId.json");

const fs = require("fs")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const { json } = require("express")
const array = []

//signup the account*****************************************************

const create = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    const storeData = {
      Name: req.body.Name,
      age: req.body.age,
      email: req.body.email,
      password: pass
    };

    const data = await new studentName(storeData);
    array.push(storeData)

    const result = await studentName.findOne({ email: data.email });
    if (result) {
      res.send("Email is alreaday taken  take another email or login ");
    }
    // data.save();
    // console.log(data)
    console.log('data saveed successfully')

    let data1 = JSON.stringify(array, null, 4);
    console.log(data1)

    fs.writeFile('studentsId.json', data1,
      //{ flag: 'a', spaces: 2 }, for appending more then one data in json file open this line
      (err) => {
        if (err) {
          throw err;
        }
        console.log("File is updated.");
      });

    return res
      .status(200)
      .send({ status: 200, message: `sign up has suceesfully welcome ${storeData.Name}` });
  }
  catch (err) {
    console.log("error", err);
    return res.status(500).send({ status: 500, message: "Something went wrong" });
  }
};

// login page****************************************************************************8

const login = async (req, res) => {
  const password = req.body.password;
  const data = await studentName.findOne({ email: req.body.email });

  if (data) {
    // console.log(data)
    const check_password = await bcrypt.compare(password, data.password);

    if (check_password) {

      const token = jwt.sign({ _id: data._id }, "hash");
      return res
        .status(200)
        .send({ status: true, message: `login successful ${data.Name} `, token: token });
    }
    else {
      return res.send("incorrect password");
    }
  }
  else {
    return res.status(404).send({ status: false, message: "User Not exist " });
  }
};
//  getAggrate **********************************************8

const getAggrate = async(req,res)=>{
  try{
    const data = await studentName.aggregate([
      {
        $lookup: {
          from: "studentAddress",
          let: { studentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$studentId", "$$studentId"] }],
                },
              },
            },
          ],
          as: "studentAddress",
        },
      },
    //  ,for three collection we can use two time lookup olny two collection we have to use 1 time
      {
        $lookup: {
          from: "studentBookName",
          let: { studentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$studentId", "$$studentId"] }],
                },
              },
            },
          ],
          as: "bookname",
        },
      },
      {"$unwind": "$studentAddress" },
      // for getting only one  data  like email name password you can use below this line

      // ,{
      //   $project:{
      //     Name:1
      //   },
      // },


    ]);
    res.send(data);
    // console.log(data)
  }catch(err){
      res.send(err)
  }
}
// search the data*******************************************************************

const search = async (req, res) => {
    const{name}= req.params;
    
    try {
        const data = await studentName.find({
            $or: [{ Name : { $regex: String(name), $options: "i" } }],
        });
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

// get the data************************************************************

const get = async (req, res) => {
  try {
    const data = await studentName.find()
    return res.status(200).send({ datalist: data })

  } catch (error) {
    return res.send(error)

  }

}
// get data by id*************************************************

const getById = async (req, res) => {
  const _id = req.params.id
  try {
    const data = await studentName.findOne({ _id: _id })
    return res.status(200).send(data)
  } catch (error) {
    return res.send(error)

  }
}

// update data by id*************************************************

const patch = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await studentName.findByIdAndUpdate(_id, req.body, {
      new: true
    })
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

// delete data by id****************************************************
const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await studentName.deleteOne({
      _id: id
    })
    res.send(data)
    console.log(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

const insert_many = async (req, res) => {
  const data = await studentName.insertMany(json_data)
  console.log(data)

  res.send(data);

  //console.log(json_data)
}

module.exports = { create, login, get, getById, patch, deleteData, insert_many ,search , getAggrate}

