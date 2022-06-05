const express = require ("express");
const controller =require("./controller.js")

const router = express.Router()
//Create a new organisateur
router.post("/", controller.create)

//Retrieve client with id
//router.get("/:idclient", controller.findPanier)///////////


// Retrieve all excursion
router.get("/", controller.findAll)

//find  
//router.get("/liste/", controller.findlistedagence)



//Delete a excursion with idexcursion
router.delete("/:idexcursion", controller.deletee)
module.exports=router 
