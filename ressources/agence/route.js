const express = require ("express");
const controller  =require ("./controller.js")

const router = express.Router()
//Create a new agence
router.post("/", controller.create)

//Retrieve agence with id
router.get("/find", controller.findAgence)///////////

router.get("/findemail/", controller.findemail)
// Retrieve all agence
router.get("/", controller.findAll)

//Update agence with id
router.put("/:id", controller.update)

//delete agence with id
router.delete("/delete", controller.deletee)

module.exports = router;
