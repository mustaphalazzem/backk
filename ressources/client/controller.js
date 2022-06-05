const Client = require ( './model.js')
const jwt =require('jsonwebtoken') ;
const mongoose = require( 'mongoose');
const passport = require ('passport');
const _ = require( 'lodash')
const os = require("os");

//Create and save a new client
const create = async (req, res  ) => {
    //Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "nom est requis!"})
        return
    }
    if (!req.body.prenom) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    if (!req.body.email) {
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
    if (!req.body.genre) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }

    //Create a client
    const client= new Client({
        name: req.body.name,
        prenom: req.body.prenom,
        email: req.body.email,
        numtel: req.body.numtel,
        addresse: req.body.addresse,
        genre: req.body.genre,
        pdp: req.body.pdp,
        mdp: req.body.mdp,
       
    }
    )
    
    console.log(req.body)
    //save client in database

        await client.save();
		const token = await jwt.sign({_id: client._id}, 'secretkey');
    res.status(200).json({token});       
    }

  


//Find client with id-
const findClient = (req, res) => {
    const id = req.query.id
    console.log("erfffhj")
    Client.findById(id)
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found  "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving client with id " + id })
        })
}

    

//Retrieve all client form db
const findAll = (req, res) => {
    Client.find()
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

//Update a client by the id 

const update = (req , res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "data to update can not empty!"
        })
    }

    const id = req.params.id
    Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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
    Client.findByIdAndDelete(id)
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
const findemail = (req, res) => {
  
       const email= req.query.email
       console.log("zzz")
    Client.findOne( {"email":email})
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
const findemaill = (req, res) => {
  
    const email= req.query.email
    console.log("zzz")
    Client.findOne( {"email":email})
     .then(data => {
         if(!data)
         res.status(404).send({ message: "Not found excursion at date " + email })
         else res.send(data)
     })
     .catch(err => {
         res
             .status(500)
             .send({ message: "error retrieving excursion at date " + email })
     })
}
        const loginUser = async (req, res) => {
            const login = {
                email: req.body.email,
                mdp: req.body.mdp
            }
          
            try {
                let user = await Client.findOne({
                    email: login.email,
                    
                });
               
                //check if user exit
                if (!user) {
                    res.status(400).json({
                        type: "Not Found",
                        msg: "Wrong Login "
                    })
                }
                let match = await user.compareUserPassword(login.mdp, user.mdp);
                if (match) {
                    let token = await user.generateJwtToken({
                        user
                    }, "secret", {
                        expiresIn: 604800
                    })
                    if (token) {
                        res.status(200).json({
                            success: true,
                            token: token,
                            userCredentials: user,
                           
                        })
                    }
                } else {
                    res.status(400).json({
                        type: "Not Found",
                        msg: "Wrong Login Details"
                    })
                }
            } catch (err) {
                console.log(err)
                res.status(500).json({
                    type: "Something Went Wrong",
                    msg: err
                })
         
            }
           

        }  
        const userInfo = os.userInfo();

        // get uid property
        // from the userInfo object
        const _id = Client._id;
        
        console.log(_id); // 20
        const defineDummyData = async (req, res) => {
            res.json({
                message: "Hello World"
            })
        }
        const registerNewUser = async (req, res) => {
            try {
                let user = new Client({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    numtel: req.body.numtel,
                    addresse: req.body.addresse,
                    genre: req.body.genre,
                   /*pdp: req.body.pdp,*/
                    mdp: req.body.mdp,
                    // img: {
                    //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    //     contentType: 'image/png'
                    // }
                })
                user.mdp = await user.hashPassword(req.body.mdp);
                //multerConf.single('image')
                let createdUser = await user.save();
                res.status(200).json({
                    msg: "New user created",
                    data: createdUser
                })
            } catch (err) {
                console.log(err)
                res.status(500).json({
                    error: err
                })
 
            }}
            const findexcursion = (req, res) => {
    
                const id = req.query.id
                console.log("jf")
                Client.find({"excursion.idexcursion" : id }) 
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

            const insert = (req, res) => {
 
                id=req.body.id 
                const {idexcursion,nom,destination,depart,prix,date_depart,date_fin,photos,idorg} = req.body;
            
                let excursions = { idexcursion,nom,destination,depart,prix,date_depart,date_fin,photos,idorg };
              
                console.log(excursions)
                Client.findByIdAndUpdate(id,
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
            const removeexcursion = (req, res) => {
                const idexcursion = req.body.idexcursion
                const _id = req.body._id
                console.log(_id)
                console.log("jf")
                Client.updateOne({'_id':_id},
                    {
                      $pull: {
                         'excursions': {
                           idexcursion : idexcursion
                      }
                     }
                    }) 
                    
                    .then(data => {
                        if(!data)
                        res.status(404).send({ message: "Not found excursion with name "+ _id })
                        else
                         res.send(data)
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .send({ message: "error retrieving excursion with name " + _id })
                    })
            }

        



module.exports = {
    create,
    registerNewUser,
    defineDummyData,
    findClient,
    findAll,
    findexcursion,
    insert,
    removeexcursion,
    update,
    findemaill,
    findemail,
    loginUser,
    deletee }
    

