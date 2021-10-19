const router = require("express").Router();
const chienController = require("../controllers/chiens/chien.controller");
const multer = require("multer");
const upload = multer();
const fs = require("fs");

///Obtenir toutes les catégories

///Obtenir tous les produits/
router.get("/", chienController.getAllChiens);
//Obtenir 1 produit
router.get("/:id", chienController.getChien);
///update 1 produit
router.put("/:id", chienController.updateOneChien);
///delete 1 produit
router.delete("/:id", chienController.deleteOneChien);

///Créer un produit
router.post("/", upload.single("imageUrl"), chienController.newChien);

module.exports = router;
