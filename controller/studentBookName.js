const studentBook = require("../model/studentBookName");

const create = async (req,res)=>{
    const {Hindi,Scince,math,studentId,studentaddressId} = req.body

    const data ={
        Hindi,
        Scince,
        math,
        studentaddressId,
        studentId
    }
    const data1 = await studentBook.create(data)

    data1.save()
    res.send(data1)

}

const filterdata = async (req, res) => {
    const data = req.body;

    let query = {};

    let limit = req.body.limit || 10;
    let skip = req.body.skip || 1;
    
    let addressObj = {}
    if (data.Hindi) query.Hindi = { $gt: data.Hindi }
    // if (data.math) query.math = { $gt: data.math }
    // if (data.city) addressObj.city = { $in: data.city }

    const count =await studentBook.countDocuments(query)


    const filterData = await studentBook.find(query).populate({path:"studentaddressId",match:addressObj}).limit(limit).skip((skip-1) * limit)
    console.log(filterData)
    res.json ({data:filterData,totalCount:count})
    }



const get = async (req, res) => {
    try {
        const users = await studentBook.find()
        .populate("studentId")
        .populate("studentaddressId");
        res.send(users)
    } catch (error) {
        console.log(error)
    }
}

const getById = async (req,res) =>{
    const _id = req.params.id
    try {
        const data = await studentBook.findOne({_id:_id})
        return res.status(200).send(data)
    } catch (error) {
        return res.send(error)
        
    }
}

const patch = async (req,res) =>{
    
    try {
        const _id = req.params.id
        console.log(_id)
        const data = await studentBook.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        return res.status(200).send(data)
    } catch (error) {
        return res.send(error)
        
    }
}


const deleteData = async (req,res) =>{
    const _id = req.params._id
    try {
        const data = await studentBook.deleteOne(_id)
        return res.status(200). send(data)
    } catch (error) {
        return res.send(error)
        
    }
}

module.exports = {create , get , getById, patch , deleteData , filterdata}