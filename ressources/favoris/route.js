const express=require ("express");
const controller = require("./controller.js")

const router = express.Router()
//Create a new favoris
router.post("/", controller.create)

//Retrieve client with id
router.get("/:client", controller.findfavoris)///////////


// Retrieve all organisateur
router.get("/", controller.findAll)

//find excursion 
router.get("/:idexcursion", controller.findfavoris)



//Delete a excursion with idexcursion
router.delete("/:idexcursion", controller.deletee)
module.exports = router
