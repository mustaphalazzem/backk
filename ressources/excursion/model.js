const { Schema, model } = require("mongoose");
const Client = require("../client/model");
//const {clientSchema} = require(__dirname +"../client/model").schema;
const {clientSchema} = require('../client/model');
clientt=clientSchema
const excursionSchema = new Schema(
        {
            nom: {
                type:String,
                required:false
            },
            destination: {
                type:String,
                required:false
            },
            depart: {
                type:String,
                required:false
            },
            prix: {
                type:Number,
                required:false
            },
            date_depart: {
                type:String,
                required:false
            },
            date_ajout :{
                type:Date,
                required:false
            },
            date_modif :{
                type:Date,
                required:false
            },
            date_fin :{
                type:Date,
                required:false
            },
            photos :{
                type:String,
                required:false
            },
            idorg : {
                type:String,
                required:false
            },
         client   : { 
                    type : [clientSchema|undefined]}
    
            },
        {timestamps: true}
    )

const Excursion = model("excursion", excursionSchema)
module.exports =  Excursion