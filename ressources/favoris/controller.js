const Favoris = require('./model.js')
const Excursion = require('./model.js')

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
    const favoris= new Favoris({
        idexcursion: req.body.idexcursion,
        idclient: req.body.idclient,
        
    })
    console.log('req',favoris)
    //save panier in database
    favoris
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

//Retrieve allfavoris form db
const findfavoris = (req, res) => {
    const client = req.query.idclient
    if(!client)
        Favoris.find().then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ client })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving favoris with name " + client})
        })
    else
        Excursion.find({"idclient" : client})
            .then(data => {
                if(!data)
                res.status(404).send({ message: "Not found favoris with name "+ client })
                else res.send(data)
            })
            .catch(err => {
                res
                    .status(500)
                    .send({ message: "error retrieving favoris with name " + client })
            })
}
//Retrieve allexcursion form db
const findAll= (req, res) => {
    Favoris.find()
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
        
            const idexcursion = req.params.idexcursion
            Favoris.findOneAndDelete(idexcursion)
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
                    Favoris.find({"idexcrusion" : id})
                        .then(data => {
                            res.send(data)
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "some error occured while retrieving"
                            })
                        })

                }
        



module.exports = {
    create,
    findfavoris,
    findAll,
    deletee,
    findExcursionPanier
}


