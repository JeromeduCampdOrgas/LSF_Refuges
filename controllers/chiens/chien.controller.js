const ChienModel = require("../../models/chiens.model");
const fs = require("fs"); //natif express ou node
const { promisify } = require("util"); //natif express ou node
const pipeline = promisify(require("stream").pipeline);

const ObjectID = require("mongoose").Types.ObjectId;
const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");
const uuid = uuidv4();

//Création produit
module.exports.newChien = (req, res) => {
  //console.log(req.file);

  let fileName;
  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");
    } catch (err) {
      //const errors = uploadErrors(err);
      return res.status(201).json({ err: "y'a un probleme ici" });
    }

    fileName = req.body.name + ".jpg";
    console.log(fileName);
    pipeline(
      req.file.stream,
      //console.log(req.file.stream)
      fs.createWriteStream(
        `${__dirname}/../../client/public/uploads/products/${fileName}`
      )
    );

    const newChien = new ChienModel({
      refuge: req.body.refuge,
      name: req.body.name,
      robe: req.body.robe,
      imageUrl: req.file !== null ? "./uploads/products/" + fileName : "",
      age: req.body.age,
      description: req.body.description,
      sexe: req.body.sexe,
      chat: req.body.chat,
      divers: req.body.divers,
      carrousel: req.body.carrousel,
    });

    try {
      const chien = newChien.save();
      return res.status(201).json(chien);
    } catch (err) {
      res.status(200).send({ err: "raté" });
    }
  }
};

//get 1 produit
module.exports.getChien = (req, res) => {
  //console.log("coucou");
  //console.log(req.params.id);
  ChientModel.findOne({ _id: req.params.id }, (err, docs) => {
    res.send(docs);
  });
};
//tous les produits
module.exports.getAllChiens = async (req, res) => {
  const chiens = await ChienModel.find();
  /*produits.push(products);
  console.log(produits);*/
  res.status(200).json(chiens);
};

//update 1 produit
module.exports.updateOneChien = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {
    await ChientModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          age: req.body.age,
          chat: req.body.chat,
          robe: req.body.robe,
          emplacement: req.body.emplacement,
          divers: req.body.divers,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          res.send(docs);
        } else {
          res.status(400).json({ err: "erreur!!" });
        }
      }
    );
  }
};
//delete 1produit
module.exports.deleteOneChien = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {
    try {
      await ChienModel.deleteOne({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
};
