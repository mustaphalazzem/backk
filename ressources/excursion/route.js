    const express = require ("express");
    const controller =require ("./controller.js")
    const auth =require ("C:/Users/mustapha/Desktop/Role_based_api-master/ressources/client/middleware/auth")
    const router = express.Router()
    //Create a new excursion
    router.post("/", controller.create)

    //Retrieve excursions with destination
    router.get("/dest", controller.findDest)

    //Retrieve an excursions at date
    router.get("/date", controller.findAtDate)

    // Retrieve all excursions
    router.get("/", controller.findAll)
    router.put("/removepart/",controller.removepart)

    //Update excursion with id
    router.put("/insert/", controller.insert)
    //find excursion by id
    router.get("/find/",controller.findExcursion)
    //Sort croissant excursion with id
    router.get("/croissant", controller.triercroissant)
    //Sort decroissant excursion with id*
    router.put("/:id", controller.update)

    router.get("/decroissant", controller.trierdecroissant)
    //find excursion by  id organisateur
    
    router.get("/findAll" ,controller.findAll)
    //delete excursion
    router.delete("/delete", controller.deletee)
    router.get("/findpart/" ,controller.findpart)
    router.get("/findorg/",controller.findOrganisateur)
  
   module.exports= router
