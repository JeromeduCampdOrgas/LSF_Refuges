const ChienModel = require("../../models/chien.model");
const fs = require("fs"); //natif express ou node
//const { promisify } = require("util"); //natif express ou node
//const pipeline = promisify(require("stream").pipeline);

//const ObjectID = require("mongoose").Types.ObjectId;
//const { v4: uuidv4 } = require("uuid");
////const { json } = require("body-parser");
//const uuid = uuidv4();

//Création chien
module.exports.newChien = (req, res, next) => {
  const chienObject = req.body;
  const chien = new ChienModel({
    ...chienObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  //enregistrement en base
  chien
    .save()
    .then(() => {
      res.status(201).json({ message: "Post saved successfully!" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
//get 1 produit
module.exports.getChien = (req, res) => {
  //console.log("coucou");
  //console.log(req.params.id);
  ChienModel.findOne({ _id: req.params.id }, (err, docs) => {
    res.send(docs);
  });
};
//tous les produits
module.exports.getAllChiens = async (req, res) => {
  const chiens = await ChienModel.find();
  /*produits.push(products);*/

  res.status(200).json(chiens);
};

//update 1 produit
module.exports.updateOneChien = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {
    await ChienModel.findOneAndUpdate(
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
  /*if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {*/
  try {
    await ChienModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
    //}
  }
};
