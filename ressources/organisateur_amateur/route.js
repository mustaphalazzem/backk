const express = require ("express");
const controller = require ("./controller.js")

const router = express.Router()
//Create a new organisateur
router.post("/", controller.create)

//Retrieve organisateur with id
router.get("/find", controller.findOrganisateur)///////////


// Retrieve all organisateur
router.get("/", controller.findAll)

//Update organisateur with id
router.put("/:id", controller.update)
router.post("/login", controller.loginUser);
router.delete("/delete", controller.deletee)
router.get("/data",controller.defineDummyData)
router.post("/register", controller.registerNewUser)
router.get("/findemail/", controller.findemail)
module.exports = router
