const Bus = require ('./model.js')
const Reservation = require ('C:/Users/mustapha/Desktop/Role_based_api-master/ressources/reservation/model.js')


//Create and save a new bus
const create = async (req, res) => {
    //Validate request
    if (!req.body.nb_place_bus) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
     if (!req.body.marque) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.idagence) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    

    //Create a organisateur_amateur
    const bus= new Bus({
        nb_place_bus: req.body.nb_place_bus ,
        marque:req.body.marque ,
        idagence:req.body.idagence ,
        idlouer:req.body.idlouer ,
        
    })
    console.log('req',bus)
    //save agence in database
    bus
    .save(bus)
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
const louer =(req,res) => {
    const id = req.query.id
    const idlouer = req.query.idlouer
    const email = req.query.email
    
    Bus.findByIdAndUpdate({'_id' : id}, 
    {'$set' : {'idlouer' : idlouer,'email':email }})
    .then(data => {
        if(!data)
        res.status(404).send({ message: "Not found bus with id"+id})
        else res.send(data)
    })
    .catch(err => {
        res
            .status(500)
            .send({ message: "error retrieving bus with id " + id })
    })
}
//Find a single bus with an id
const findOne = (req, res) => {
    const id = req.query.id

   Bus.findById(id)
    
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found bus with id"+id})
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving bus with id " + id })
        })
}
const findreserv = (req, res) => {
    const idagence = req.query.idagence

   Bus.find({"idagence":idagence})
    
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found bus with id"+id})
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving bus with id " + id })
        })
}
//Update a bus by the id 

const update = (req , res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "data to update can not empty!"
        })
    }

    const id = req.params.id
    Bus.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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
//delete a agence by the id 
const deletee = (req , res) => {
   
id=req.body.id

    Bus.findByIdAndDelete(id).then((response)=>{
        return res.status(200).json(" bus delete")
    }).catch((err)=>{
        return res.status(200).json(err)
    })
        }
//Retrieve all client form db
const findAll = (req, res) => {
    Bus.find()
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
const idlouer = (req, res) => { 
    id=req.body._id 
    const {idexcursion,nom,destination,depart,prix,date_depart,date_fin,photos,idorg} = req.body;

    let idlouer = { idexcursion,nom,destination,depart,prix,date_depart,date_fin,photos,idorg };
    console.log(idlouer)
    console.log(id)
    Bus.findByIdAndUpdate(id,
        {$push: {idlouer: idlouer}},
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


module.exports= {

    create,
    findOne,
    update,
    deletee,
    findAll,
    idlouer,
    findreserv
    
}

