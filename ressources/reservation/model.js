const { Schema, model } = require("mongoose");

 const reservationSchema = new Schema(
        {
            nb_place_bus: {
                type:Number,
                required:false
            },
            marque: {
                type:String,
                required:false
            },
            idorganisateur: {
                type:String,
                required:false
            },
            idagence: {
                type:String,
                required:false
            },
        },
        {timestamps: true}
    )

const Reservation = model("reservation", reservationSchema)
module.exports= Reservation