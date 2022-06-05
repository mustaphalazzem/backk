const { Schema, model } = require("mongoose");
const {excursionSchema} = require('C:/Users/mustapha/Desktop/Role_based_api-master/ressources/excursion/model');
const {clientSchema} = require('C:/Users/mustapha/Desktop/Role_based_api-master/ressources/client/model');
const {agenceSchema} = require('C:/Users/mustapha/Desktop/Role_based_api-master/ressources/agence/model');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "client",
      enum: ["client", "admin", "organisateur_amateur","agence"]
    },
    username: {
      type: String,
      required: true
    },
   mdp: {
      type: String,
      required: true
    },
    client:{type: [clientSchema|undefined] },
    excursion : {type: [excursionSchema|undefined]},
    agence :{type : [agenceSchema|undefined]},
  },
  
  { timestamps: true }
);

module.exports = model("users", UserSchema);
