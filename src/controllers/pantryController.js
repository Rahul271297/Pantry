const PantryModel = require('../models/pantryModel.js')
const BasketModel = require('../models/basketModel.js')


const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
/***********///////////*****************Create Pantry********************** */

const createPantry = async function(req,res){
    try{
        const requestBody = req.body;
       
        if(!isValidRequestBody(requestBody)){
            res.status(400).send({status:false,msg:"Parameters are required,body should not be empty"})

        }
        const {name,emailId}= requestBody
        if(!isValid(name)){
           return res.status(400).send({status:false,msg:'Name is required'})
        }

        if(!isValid(emailId)){ 
           return res.status(400).send({status:false,msg:'Email is required'})
        }

        if (!(emailRegex.test(emailId))) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })
           
        }
        let isEmailAlreadyUsed = await PantryModel.findOne({emailId:emailId})
        if(isEmailAlreadyUsed){
            return res.status(400).send({status:false,msg:'Email is already used'})
        }
        const savedData = {name,emailId}
        const pantryData = await PantryModel.create(savedData)
        const Id = pantryData._id
        
        return res.status(201).send({status:true,msg:'Pantry successfully created',data:Id})
    }catch(error){
        console.log(error)
        res.status(500).send({ status: false, Message: error.message })

    }
}
//************************************GEt Pantry ************************** */

const getPantry = async function (req, res) {
    try {
        const pId=req.params.pantryId;

        const baskets = await BasketModel.find({ pantryId:pId }).select({ _id: 0, name: 1,ttl:1});;

        const details= await PantryModel.findOne({_id:pId});

        res.status(200).send({ status: true, message: "pantry details", data:{ ...details.toObject(), baskets}});

    } catch (error) {

      return res.status(500).send({ status: false, message: error.message })
    }

};

module.exports={createPantry,getPantry}