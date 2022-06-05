const { ClientRequest } = require('http')
const Reservation =require ('./model.js')

//Create and save a panier
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
    if (!req.body.idorganisateur) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }

    //Create a panier
    const reservation= new Reservation({
        nb_place_bus: req.body.nb_place_bus ,
        marque:req.body.marque ,
        idagence:req.body.idagence ,
        idorganisateur:req.body.idorganisateur ,   
     })
    console.log('req',Reservation)
    //save panier in database
    reservation
    .save(reservation)
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

//Find panier with id

//Retrieve allpanier form db
          
const findlistedagence =(res,req) => {
    const idagence = req.query.idagence 
      Client.find({"idexcursion":idagence})
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ client })
            else res.send(data)
        })
        .catch(err => {
            res.status(500)
                .send({ message: "error retrieving excursion with name " + client })
        })


}
//Retrieve allpanier form db
const findAll= (req, res) => {
    Reservation.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while retrieving"
            })
        })
}


//delete a excursion by the id 
        const deletee = (req , res) => {
            if (!req.body) {
                return res.status(400).send({
                    message: "data to delte can not empty!"
                })
            }
        
            const id = req.params.id
            Reservation.findByIdAndDelete(id)
                .then(data => {
                    if (!data){
                        res.status(404).send({
                            message: "cannot delete"
                        })
                    } else res.send({ message: "delete succus"})
                })
                .catch(_err => {
                    res.status(500).send({
                        message: "error delete"
                    })
                })}
                
           /* const findExcursionPanier= (req, res) => {
                    Panier.find({"idexcrusion" : idexcursion})
                        .then(data => {
                            res.send(data)
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "some error occured while retrieving"
                            })
                        })

                }*/
        



module.exports= {
    create,
   // findPanier,
    findAll,
    deletee,
    findlistedagence
}


