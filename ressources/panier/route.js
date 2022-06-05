const express = require ("express");
const controller =require("./controller.js")

const router = express.Router()
//Create a new organisateur
router.post("/", controller.create)

//Retrieve client with id
router.get("/findpanier/", controller.findPanier)///////////


// Retrieve all excursion
router.get("/", controller.findAll)

//find  
router.get("/liste/", controller.findlisteclient)


router.put("/insert/", controller.insert)

//Delete a excursion with idexcursion
router.delete("/deletee/", controller.deletee)
module.exports=router 
