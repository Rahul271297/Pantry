 const { send } = require('express/lib/response')
const  mongoose  = require('mongoose')
const basketModel = require('../models/basketModel.js')
const BasketModel = require('../models/basketModel.js')
const PantryModel = require('../models/pantryModel.js')


// // For Validation criteria
 const isValid = function(value){ //(this is for validating weather the parameter's value is correct or is present or not)
   if(typeof value === 'undefined' || value === null) return false
   if(typeof value === 'string' && value .trim().length === 0) return false
   return true
 }

 const isValidRequestBody = function(requestBody){ 
  return Object.keys(requestBody).length > 0
 }

 const isValidObjectId =function(objectId) {
   return mongoose.Types.ObjectId.isValid(objectId)
 }

 const createBasket = async function (req,res){
   try{
    const requestBody = req.body ;
    
    if(!isValidRequestBody(requestBody)){
      return res.status(400).send({status:false,message:"Parameters are required"})
    }
    let PantryId = req.params.PantryId
    let BasketName = req.params.BasketName

    let {store}=requestBody;
 
    if(!isValidObjectId(PantryId)){
      return res.status(400).send({status:false,msg:"${pantryId} is not correct"})
    }
    let isNameAlreadyUsed = await BasketModel.findOneAndUpdate({name:BasketName},{store:store},{new:true})
    if(isNameAlreadyUsed){
        return res.status(200).send({status:true,data:isNameAlreadyUsed})
    }
     
    let future = new Date();
        future.setDate(future.getDate() + 30);
      let ttl=future
     
  
     
     let obj = {ttl,store,pantryId:PantryId,name:BasketName}
     
    const newData = await BasketModel.create(obj)
    const percentUpdate = await PantryModel.findOneAndUpdate({_id:req.params.PantryId},{$inc:{percentFull:1}});
    return res.status(200).send({status:true,msg:newData})
   }catch(error){
     return res.status(500).send({msg:error.message,status:false})
   }
 }
//************************************Get Basket********************** */
const getBasket = async function (req,res){
  try{
    let PantryId = req.params.PantryId
    let BasketName = req.params.BasketName

    if(!isValidObjectId(PantryId)){
      return res.status(400).send({status:false,msg:"${pantryId} is not correct"})
    }
    const basketDetails = await BasketModel.findOne({pantryId:PantryId,name:BasketName})
    if(!basketDetails){
      return res.status(404).send({status:false,message:"Basket not found"})
    }
    return res.status(200).send({status:true,data:basketDetails.store})

  }catch(error){
    return res.status(500).send({status:false,msg:error.message})
  }
}
//**************************************Update Basket*************** */
// const updateBasket = async function(req,res){
//   try{
//     const requestBody = req.body ;
    
//     if(!isValidRequestBody(requestBody)){
//       return res.status(400).send({status:false,message:"Parameters are required"})
//     }
//     let PantryId = req.params.PantryId
//     let BasketName = req.params.BasketName
//     const requestBody = req.body ;

//     if(!isValidObjectId(PantryId)){
//       return res.status(400).send({status:false,msg:"${pantryId} is not correct"})
//     }
//     if(!isValidRequestBody(requestBody)){
//       return res.status(400).send({status:false,message:"Parameters are required"})
//     }
    
    
    
//   }catch(error){
//     return res.status(500).send({status:false,Message:error.message})
//   }
// }

//*************************************Delete Basket************** */

const deleteBasket = async function(req,res){
  try{
    let PantryId = req.params.PantryId
    let BasketName = req.params.BasketName

    if(!isValidObjectId(PantryId)){
      return res.status(400).send({status:false,msg:"${pantryId} is not correct"})
    }
    const deleteBasket = await BasketModel.remove({pantryId:PantryId,name:BasketName})
     console.log(deleteBasket) 
     if(deleteBasket.deletedCount===0){
       return res.status(404).send({status:false,message:"Basket not found"})
     } 
     const percentUpdate = await PantryModel.findOneAndUpdate({pantryId:PantryId},{$inc:{percentFull:-1}},{new:true})
     return res.status(200).send({status:true,message:"Basket deleted successfully"})
  }catch(error){
    return res.status(500).send({status:false,Message:error.message})

  }
}
module.exports={createBasket,getBasket,deleteBasket}

