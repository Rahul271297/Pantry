const mongoose=require('mongoose')
const  pantrySchema = new mongoose.Schema({
   
    
    name: { 
        type:String,
       required: true
    }, 
    description: { 
        type:String,
        default : 'Small Room'
    }, 
    emailId: {        
        type:String,
        required: true, 
        unique: true
    }, 
        errors:[],
        notifications:{
            type:Boolean,
             default: true
            },

        percentFull:{type:Number}

        }, {timestamps: true} ) 

module.exports = mongoose.model( 'Pantry',pantrySchema )