const pkg =require('mongoose')
const { Schema, model } = require("mongoose");
const {excursionSchema} = require('../excursion/model');
const {UserSchema}= require ('C:/Users/mustapha/Desktop/Role_based_api-master/models/User.js')
 const organistaeur_amateurSchema = new Schema(
        {
            name: {
                type:String,
                required:false
            },
            prenom: {
                type:String,
                required:false
            },
            email: {
                type:String,
                required:false
            },
            numtel: {
                type:Number,
                required:false
            },
            addresse: {
                type:String,
                required:false
            },
            genre :{
                type:String,
                required:false
            },
            pdp :{
                type:String,
                required:false
            },
            mdp :{
                type:String,
                required:false
            },
            pdi :{
                type:String,
                required:false
            },
            excursions   : { 
                type : [excursionSchema|undefined]},
            user : {
                type :[UserSchema |undefined]},
            },



        
        {timestamps: true}
    )

const Organisateur_amateur = model("organisateur_amateur", organistaeur_amateurSchema)
module.exports = Organisateur_amateur 