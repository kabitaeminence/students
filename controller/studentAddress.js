const studentAddress = require("../model/studentAddress");

const create = async (req,res) =>{
    const {city,state,pin, studentId} = req.body
    const Storedata = {
        city,
        state,
        pin,
        studentId
    }

    const data = await studentAddress.create(Storedata);
    data.save()
    res.send(data)
}


// const get = async (req,res) =>{
//     try {
//         const data = await studentAddress.find()
//         .populate(studentId)
//         return res.status(200).send(data)
//     } catch (error) {
//         return res.send(error)
        
//     }
// }


const search = async (req, res) => {
    const{city}= req.params;
    
    try {
        const data = await studentAddress.find({
            $or: [{ city : { $regex: String(city), $options: "i" } }],
        });
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};


const get = async (req, res) => {
    try {
        const Name = req.params.Name
        const users = await studentAddress.find(Name,req.body)
        .populate('studentId')
        return res.status(200).json(users)

    } catch (error) {
        console.log(error)
    }
}


const getById = async (req,res) =>{
    const _id = req.params.id
    try {
        const data = await studentAddress.findOne({_id:_id})
        return res.status(200).send(data)
    } catch (error) {
        return res.send(error)
        
    }
}


const patch = async (req,res) =>{
    const _id = req.params.id;
    try {
        const data = await studentAddress.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        return res.status(200).send(data)
        
    } catch (error) {
        return res.send(error)
        
    } 
}

const deleteData = async (req,res) =>{
    const _id = req.params.id
    try {
        const data = await studentAddress.deleteOne({id:_id})
        return res.status(200).send(data)
    } catch (error) {
        return res.send(error)
        
    }
}

module.exports = {create , get  ,getById ,patch , deleteData , search}
