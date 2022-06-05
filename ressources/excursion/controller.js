//const Client = require('../client/model.js')
const Excursion = require('./model.js')
//Create and save a new excursion

const create = async (req, res) => {
    //Validate request
    if (!req.body.nom) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.destination) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.depart) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.date_depart) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.date_fin) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.prix) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.idorg) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }


    //Create a excursion
    const excursion= new Excursion({
        nom: req.body.nom,
        destination: req.body.destination,
        depart: req.body.depart,
        prix: req.body.prix,
        date_depart: req.body.date_depart,
        date_fin: req.body.date_fin,
        photos: req.body.photos,
        idorg: req.body.idorg,
    })
    //save excursion in database
    excursion
    .save(excursion)
    
    .then(data => {
        res.send(data)
        console.log(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating"
        })
    })
}
//Find excursion with id
const findExcursion = (req, res) => {
    
    const id = req.query.id
    
    Excursion.findById(id) 
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion with name " + id })
        })
}
const findOrganisateur = (req, res) => {
    
    const idorg = req.query.idorg
    
    Excursion.find({"idorg" : idorg}) 
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion with name " + id })
        })
}
const insert = (req, res) => {
 
    id=req.body.id 
    const { idclient,nom,prenom,email,numtel,addresse,genre} = req.body;

    let client = { idclient,nom,prenom,email,numtel,addresse,genre };
  
    console.log(client)
    Excursion.findByIdAndUpdate(id,
        {$push: {client: client}},
        {safe: true, upsert: true},
        )
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion with name " + id })
        })
}

//Find excursions with destination
const findDest = (req, res) => {
    const destination = req.query.destination
    
    // if(!dest)
    //     Excursion.find().then(data => {
    //         if(!data)
    //         res.status(404).send({ message: "Not found excursion with name "+ dest })
    //         else res.send(data)
    //     })
        // .catch(err => {
        //     res
        //         .status(500)
        //         .send({ message: "error retrieving excursion with name " + dest })
        // })
 
        Excursion.findOne({"destination": destination})
            .then(data => {
                if(!data)
                res.status(404).send({ message: "Not found excursion with name " })
                else res.send(data)
               
            })
            .catch(err => {
                res
                    .status(500)
                    .send({ message: "error retrieving excursion with name "  })
            })
}

//Find excursions with date_depart
const findAtDate = (req, res) => {
    console.log(req.query.date)
       const date = req.query.date
    Excursion.find({"date_depart" : date})
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion at date " + date })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion at date " + date })
        })
}
/*const findemail = (req, res) => {
    console.log(req.query.date)
       const email= req.query.email
    Excursion.find( {"email":email})
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion at date " + date })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion at date " + date })
        })
}*/



//Retrieve all excursions form db
function findAll(req, res) {
   
    Excursion.find()
    .then(data => {
        res.send(data)
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while retrieving"
            });
        });
}

//Update a excursion by the id 
const update = (req , res) => {
         if (!req.body) {
         return res.status(400).send({
 message: "data to update can not empty!"
})    }

   const id = req.params.id

    Excursion.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
         .then(data => {
             if (!data){
                 res.status(404).send({
                     message: "cannot update"
                 })
             } else res.send({ message: "update succus"})
         })
         .catch(err => {
             res.status(500).send({
                 message: "error update"
             })
         })
 }
const triercroissant = (req, res) => {
    Excursion.find().sort({prix:1})
 
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while retrieving"
        })
    })
}
//Find excursion with id
const findpart = (req, res) => {
    
    const id = req.query.id
    console.log("jf")
    Excursion.find({"client.idclient" : id }) 
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ id })
            else
             res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion with name " + id })
        })
}
const removepart = (req, res) => {
    const idexcursion = req.query.idexcursion
    const id = req.query.id
    console.log("jf")
    Excursion.updateOne({_id:idexcursion},
        {
          $pull: {
             client: {
               idclient : id
          }
         }
        }) 
        
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ id })
            else
             res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion with name " + id })
        })
}
const trierdecroissant = (req, res) => {
    

    Excursion.find().sort({prix:-1})
 
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while retrieving"
        })
    })}
    const deletee = (req , res) => {
        const _id = req.query._id
        Excursion.findByIdAndDelete(_id)
            .then(data => {
                if (!data){
                    res.status(404).send({
                        message: "cannot delete"
                    })
                } else res.send({ message: "delete succus"})
            })
            .catch(err => {
                res.status(500).send({
                    message: "error delete"
                })
            }) }


    



module.exports = {
    create,
    findDest,
    findAtDate,
    findAll,
    findExcursion,
    update,
    triercroissant,
    trierdecroissant,
    insert,
    removepart,
    findOrganisateur,
    deletee,
    findpart,
    //findemail
}

