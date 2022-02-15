const mongoose=require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
var basketSchema = new mongoose.Schema({ 

    store: mongoose.Schema.Types.Mixed ,
    name: { 
        type:String,
       required: true
    }, 
    ttl:Date,
    pantryId:{
        type: ObjectId
        
    }
   }, {timestamps: true} ) 

module.exports = mongoose.model( 'Basket',basketSchema )