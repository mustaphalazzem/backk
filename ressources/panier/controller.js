const { ClientRequest } = require('http')
const Panier = require ('./model.js')
const Excursion =require ('./model.js')

//Create and save a panier
const create = async (req, res  ) => {
    //Validate request
    if (!req.body.idexcursion) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.idclient) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
  

    //Create a panier
    const panier= new Panier({
        idexcursion: req.body.idexcursion,
        idclient: req.body.idclient,
        
    })

    console.log('req',panier)
    //save panier in database
    panier
    .save(panier)
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
const insert = (req, res) => {
 
    id=req.body.id
    const {nom,destination,depart,prix,date_depart,date_fin,photos,idorg} = req.body;

    let excursions = { nom,destination,depart,prix,date_depart,date_fin,photos,idorg};
  
    console.log(excursions)
   Panier.findByIdAndUpdate(id,
        {$push: {excursions: excursions}},
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
//Retrieve allpanier form db
const findPanier = (req, res) => {
    const client = req.query.idclient
        Excursion.find({"idclient" : client})
            .then(data => {
                if(!data)
                res.status(404).send({ message: "Not found excursion with name "+ client })
                else{ res.send(data)
                console.log(data.excursions)}
            })
            .catch(err => {
                res
                    .status(500)
                    .send({ message: "error retrieving excursion with name " + client })
            })
}
const findlisteclient =(res,req) => {
    const idexcursion = req.query.idexcursion 
      Client.find({"idexcursion":idexcursion})
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
    Panier.find()
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
        
            const idexcursion = req.body.idexcursion
            Panier.findOneAndDelete(idexcursion)
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
                
            const findExcursionPanier= (req, res) => {
                    Panier.find({"idexcrusion" : idexcursion})
                        .then(data => {
                            res.send(data)
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "some error occured while retrieving"
                            })
                        })

                }
        



module.exports= {
    create,
    findPanier,
    findAll,
    deletee,
    findExcursionPanier,
    findlisteclient,
    insert
}


