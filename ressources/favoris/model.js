const { Schema, model } = require("mongoose");


 const favorisSchema = new Schema(
        {
            idexcursion: {
                type:String,
                required:false
            },
           idclient : {
               type:String ,
               required:false 
           } 
        },

            
        {timestamps: true}
    )

const Favoris = model("favoris", favorisSchema)
module.exports= Favoris 