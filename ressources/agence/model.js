const { Schema, model } = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
const {excursionSchema} = require('../excursion/model');
const {UserSchema}= require ('C:/Users/mustapha/Desktop/Role_based_api-master/models/User.js')
const bcrypt = require ('bcrypt')
const uniqueValidator  = require ('mongoose-unique-validator')
const jwt = require ( "jsonwebtoken")
 const agenceSchema = new Schema(
        {
            nom: {
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


const Agence = model("agence", agenceSchema)
module.exports = Agence