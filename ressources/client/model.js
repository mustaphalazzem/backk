
const { Schema, model } = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
const {excursionSchema} = require('../excursion/model');
const {UserSchema}= require ('C:/Users/mustapha/Desktop/Role_based_api-master/models/User.js')
const bcrypt = require ('bcrypt')
const uniqueValidator  = require ('mongoose-unique-validator')
const jwt = require ( "jsonwebtoken")
 const clientSchema = new Schema(
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
            
            client_id: {
                type: Number, default: 0, unique: true
            },
            excursions   : { 
                type : [excursionSchema|undefined]},
            user : {
                type :[UserSchema |undefined]},
            },

        
           

     
        {timestamps: true}
    )
    clientSchema.plugin(uniqueValidator, {
        message: '{PATH} Already in use'
    });
    autoIncrement.initialize(mongoose.connection); 
clientSchema.plugin(autoIncrement.plugin, {
    model: 'clientSchema',
    field: 'client_id',
    startAt: 1,
    incrementBy: 1
  });
 
 
    clientSchema.methods.hashmdp = async (mdp) => {
        return await bcrypt.hashSync(mdp, 10);
    }
    clientSchema.methods.compareUsermdp = async (inputtedmdp, hashedmdp) => {
        return await bcrypt.compare(inputtedmdp, hashedmdp)
    }
    clientSchema.methods.generateJwtToken = async (payload, secret, expires) => {
        return jwt.sign(payload, secret, expires )
    }
    
    
const Client = model("client", clientSchema)

module.exports = Client
