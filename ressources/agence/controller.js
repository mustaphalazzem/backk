const Agence = require('./model.js')


//Create and save a new agence
const create = async (req, res  ) => {
    //Validate request
    if (!req.body.names) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.email) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.numtel) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.mdp) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.addresse) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
   

    //Create a organisateur_amateur
    const agence= new Agence({
        name: req.body.name,
        email: req.body.email,
        numtel: req.body.numtel,
        addresse: req.body.addresse,
        pdp: req.body.pdp,
        mdp: req.body.mdp,
        pdi: req.body.pdi
    })
    //save agence in database
    agence
    .save(agence)
    .then(data => {
     res.send(data)
           
    })
    .catch(err=> {
        res.status(500).send({
             message:
            err.message || "some error occured while creating the tutorial"
        })
    })
}
const findemail = (req, res) => {
  
    const email= req.query.email
    console.log("zzz")
 Agence.findOne( {"email":email})
     .then(data => {
         if(!data)
         res.status(404).send({ message: "Not found excursion at date " + email })
         else res.send(data._id)
     })
     .catch(err => {
         res
             .status(500)
             .send({ message: "error retrieving excursion at date " + email })
     })
}
//Find agence with id
const findAgence = (req, res) => {
    const id = req.query.id
    Agence.findById(id)
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion with name " + idt })
        })
}



//Retrieve all agences form db
const findAll = (req, res) => {
    Agence.find()
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

//Update a agence by the id 
const update = (req , res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "data to update can not empty!"
        })
    }

    const id = req.params.id
    Agence.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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

//Update a agence by the id 
const deletee = (req , res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "data to delte can not empty!"
        })
    }

    const id = req.params.id
    Agence.findByIdAndDelete(id)
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
        })
}

export default {
    create,
    findAgence,
    findAll,
    update,
    deletee,
    findemail,
}
