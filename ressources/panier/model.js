const { Schema, model } = require("mongoose");
const {excursionSchema} = require('../excursion/model');


 const panierSchema = new Schema(
        {
            
          
           idclient : {
               type:String ,
               required:false 
           } ,
           excursions:  {
                    type : [excursionSchema|undefined]}
    
        },
    {timestamps: true}
)

const Panier = model("panier", panierSchema)
module.exports=Panier 