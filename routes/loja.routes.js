module.exports = (app) => {
  const multer = require("multer");
  const fs = require("fs");
  var path = require("path");

  const lojas = require("../controllers/loja.controller");
  var router = require("express").Router();

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/loja");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
  });

  const upload = multer({
    storage: storage,
  });

  router.post("/upload/", upload.single("file"), async (req, res) => {
    res.send({
      upload: true,
      file: req.file,
    });
  });

  router.get("/upload/:arquivo", (req, res) => {
    const arquivo =
      path.dirname(__dirname) + `/uploads/loja/${req.params.arquivo}`;
    console.log("dir: " + arquivo);
    fs.readFile(arquivo, function (err, data) {
      res.contentType("png");
      res.send(data);
    });
  });

  router.post("/", lojas.create);
  router.get("/", lojas.findAll);
  router.get("/:id", lojas.findOne);
  router.put("/:id", lojas.update);
  router.delete("/:id", lojas.delete);
  router.delete("/", lojas.deleteAll);

  app.use("/lojas", router);
};
