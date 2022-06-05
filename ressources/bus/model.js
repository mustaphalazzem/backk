const { Schema, model } = require("mongoose");
const {excursionSchema} = require('../excursion/model');

 const busSchema = new Schema(
        {
            nb_place_bus: {
                type:Number,
                required:false
            },
            marque: {
                type:String,
                required:false
            },
            idagence: {
                type:String,
                required:false
             },
            email: {
                type:String,
                required:false
            },
            idlouer: {
                type:[excursionSchema|undefined],
                required:false
            }
          

        },
        {timestamps: true}
    )

const Bus = model("bus", busSchema)
module.exports= Bus