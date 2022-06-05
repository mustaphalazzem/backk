const express = require("express");
var router = express();
const uploadController = require("../controller/upload");



  router.post("/upload", uploadController.uploadFiles);
  router.get("/files", uploadController.getListFiles);
  router.get("/files/:name", uploadController.download);



module.exports = router;