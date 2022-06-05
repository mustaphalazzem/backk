const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const routes = require('./ressources/router/routes')
const auth = require ('./ressources/client/middleware/auth')
mongoose = require("mongoose");
 fs = require("fs")
const controller = require ('./ressources/client/controller')
// Bring in the app constants
const { DB, PORT } = require("./config");
multer = require("multer")
 
// Initialize the application
const app = exp();
app.set("view engine","ejs");

// Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());
app.use(bp.urlencoded({extended: false}))
require("./middlewares/passport")(passport);
app.use("/image",routes.imageRouter)  
// User Router Middleware
app.use("/users", require("./routes/users"));
app.use('/client',routes.clientRouter)
app.use('/nonexcursion',routes.nonExcursionRouter)
app.use('/excursion',routes.excursionRouter)
app.use('/bus',routes.busRouter)
app.use('/panier',routes.panierRouter)
app.use('/reservation',routes.reservationRouter)
app.use('/organisateur_amateur',routes. organisateur_amateurRouter)

//Schema

// const UserSchema = new mongoose.Schema({
//    productName: {type: String, required: true, unique: true},
//   image: {data: Buffer, contentType: String},
//    price: {type: Number, required: true}
// }, {timestamps: true});

// module.exports = mongoose.model("Product", UserSchema);
//SET STORAGE
 app.set("view engine","ejs");
 
// // SET STORAGE
//  var storage = multer.diskStorage({
//      destination: function (req, file, cb) {
//        cb(null, 'uploads')
//      },
//      filename: function (req, file, cb) {
//        cb(null, file.fieldname + '-' + Date.now())
//      }
//    })
 
//  var upload = multer({ storage: storage })
 
//  app.get("/",(req,res)=>{
//      res.send("index");
//  })
 
//  app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
//      var img = fs.readFileSync(req.file.path);
//      var encode_img = img.toString('base64');
//      var final_img = {
//          contentType:req.file.mimetype,
      
//        image:Buffer.from(encode_img,'base64') // New

//      };
//      Product.create(final_img,function(err,result){
//          if(err){
//              console.log(err);
//          }else{
//              console.log(result.img.Buffer);
//              console.log("Saved To database");
//              res.contentType(final_img.contentType);
//              res.send(final_img.image);
//           }
//      })
//  })

const startApp = async () => {
  try {
    // Connection With DB
    await connect(DB, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true
    });

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true
    });
    startApp();
  }
};

startApp();
