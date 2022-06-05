//const Client = require('../client/model.js')
const nonExcursion = require('./model.js')
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
    const nonexcursion= new nonExcursion({
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
    nonexcursion
    .save(nonexcursion)
    .then(data => {
        res.send(data)
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
    
    nonExcursion.findById(id) 
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
/*const findDest = (req, res) => {
    const dest = req.query.destination
    if(!dest)
        Excursion.find().then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ dest })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion with name " + dest })
        })
    else
        Excursion.find({"destination" : dest})
            .then(data => {
                if(!data)
                res.status(404).send({ message: "Not found excursion with name "+ dest })
                else res.send(data)
            })
            .catch(err => {
                res
                    .status(500)
                    .send({ message: "error retrieving excursion with name " + dest })
            })
}*/

//Find excursions with date_depart
// const findAtDate = (req, res) => {
//     console.log(req.query.date)
//        const date = req.query.date
//     Excursion.find({"date_depart" : date})
//         .then(data => {
//             if(!data)
//             res.status(404).send({ message: "Not found excursion at date " + date })
//             else res.send(data)
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({ message: "error retrieving excursion at date " + date })
//         })
// }
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
   
    nonExcursion.find()
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
// const update = (req , res) => {
//          if (!req.body) {
//          return res.status(400).send({
//  message: "data to update can not empty!"
// })    }

//    const id = req.params.id

//     Excursion.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
//          .then(data => {
//              if (!data){
//                  res.status(404).send({
//                      message: "cannot update"
//                  })
//              } else res.send({ message: "update succus"})
//          })
//          .catch(err => {
//              res.status(500).send({
//                  message: "error update"
//              })
//          })
//  }
// const triercroissant = (req, res) => {
//     Excursion.find().sort({prix:1})
 
//     .then(data => {
//         res.send(data)
//     })
//     .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "some error occured while retrieving"
//         })
//     })
// }
// //Find excursion with id
// const findpart = (req, res) => {
    
//     const id = req.query.id
//     console.log("jf")
//     Excursion.findById(id) 
//         .then(data => {
//             if(!data)
//             res.status(404).send({ message: "Not found excursion with name "+ id })
//             else
//              res.send(data.idclient)
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({ message: "error retrieving excursion with name " + id })
//         })
// }
// const trierdecroissant = (req, res) => {
    

//     Excursion.find().sort({prix:-1})
 
//     .then(data => {
//         res.send(data)
//     })
//     .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "some error occured while retrieving"
//         })
//     })}
    const deletee = (req , res) => {

    nonExcursion.deleteOne(this.id)
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
    //findDest,
    //findAtDate,
    findAll,
    findExcursion,
    // update,
    // triercroissant,
    // trierdecroissant,
    // insert,
     deletee,
    // findpart,
    //findemail
}

