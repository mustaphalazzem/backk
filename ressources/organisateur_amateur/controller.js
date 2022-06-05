const Organisateur_amateur = require ('./model.js')


//Create and save a new client
const create = async (req, res  ) => {
    //Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!"})
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
    if (!req.body.genre) {
        res.status(400).send({ message: "Content can not be empty!"})
        return
    }
    // if (!req.body.pdi) {
    //     res.status(400).send({ message: "Content can not be empty!"})
    //     return 
    // }

    //Create a organisateur_amateur
    const organisateur_amateur= new Organisateur_amateur({
        name: req.body.name,
        prenom: req.body.prenom,
        email: req.body.email,
        numtel: req.body.numtel,
        addresse: req.body.addresse,
        genre: req.body.genre,
        // pdp: req.body.pdp,
        mdp: req.body.mdp,
        // pdi: req.body.pdi
    })
    console.log('req',organisateur_amateur)
    //save organisateur amateur in database
    organisateur_amateur
    .save(organisateur_amateur)
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

//Find organisateur with id
const findOrganisateur = (req, res) => {
    const id = req.query.id
    console.log ("marbou7a")
    Organisateur_amateur.findById(id)    
    .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found organisateur with id  "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving organisateur with id " + id })
        })
}
//Retrieve all organisateurs form db
const findAll = (req, res) => {
    Organisateur_amateur.find()
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
const findMail = (req, res) => {
    const email = req.query.email
    if(!email)
    Organisateur_amateur.find().then(data => {
            if(!data)
            res.status(404).send({ message: "Not found excursion with name "+ email })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "error retrieving excursion with name " + email })
        })
    else
    Organisateur_amateur.find({"email" : email})
            .then(data => {
                if(!data)
                res.status(404).send({ message: "Not found excursion with name "+ email })
                else res.send(data)
            })
            .catch(err => {
                res
                    .status(500)
                    .send({ message: "error retrieving excursion with name " + email })
            })
}

//Update a organisateur amateur by the id 
const update = (req , res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "data to update can not empty!"
        })
    }

    const id = req.params.id
    Organisateur_amateur.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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
const loginUser = async (req, res) => {
    const login = {
        email: req.body.email,
        mdp: req.body.mdp
    }
    try {
        let user = await Organisateur_amateur.findOne({
            email: login.email,
        });
        //check if user exit
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login "
            })
        }
        let match = await user.compareUsermdp(login.mdp, user.mdp);
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
                    userCredentials: user
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

const defineDummyData = async (req, res) => {
    res.json({
        message: "Hello World"
    })
}
const registerNewUser = async (req, res) => {
    try {
        let user = new Organisateur_amateur({
            name: req.body.name,
            prenom: req.body.prenom,
            email: req.body.email,
            numtel: req.body.numtel,
            addresse: req.body.addresse,
            genre: req.body.genre,
            pdp: req.body.pdp,
            mdp: req.body.mdp,
            pdi: req.body.pdi
        })
        user.mdp = await user.hashmdp(req.body.mdp);
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
    }
    
}
const findemail = (req, res) => {
  
    const email= req.query.email
    console.log("zzz")
    Organisateur_amateur .findOne( {"email":email})
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

module.exports= {
    create,
    findOrganisateur,
    findAll,
    update,
    deletee,
    registerNewUser,
    loginUser,
    defineDummyData,
    findemail
}


