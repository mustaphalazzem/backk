const express = require ("express");
const controller= require("./controller.js")

const router = express.Router()
//Create a agence
router.post("/", controller.create)


router.get("/findAll", controller.findAll)

//Retrieve a single bus with id
router.get("/find", controller.findOne)
router.put("/louer/", controller.idlouer)
//Update a bus with id
router.put("/:id", controller.update)

//Delete a bus with id
router.delete("/delete", controller.deletee)
router.get("/findreserv/", controller.findreserv)




module.exports = router; 