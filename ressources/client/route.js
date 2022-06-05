const  controller=require ( "./controller.js")
const express = require ('express');
var router = express()
const auth = require ('./middleware/auth')
//Create a new client
router.post("/",controller.create)

//Retrieve client with id
router.get("/find", controller.findClient)///////////
router.get("/findexcursion/" ,controller.findexcursion)
router.put("/insert/", controller.insert)
router.put("/removeexcursion/",controller.removeexcursion)


// Retrieve all client
router.get("/", controller.findAll)

//Update client with id
router.put("/:id", controller.update)

//delete client

router.delete("/delete", controller.deletee)


router.post("/login", controller.loginUser);

router.get("/excursion" ,controller.defineDummyData)
router.post("/register", controller.registerNewUser)
router.get("/findemail/", controller.findemail)
router.get("/findemaill/", controller.findemaill)

module.exports= router 
