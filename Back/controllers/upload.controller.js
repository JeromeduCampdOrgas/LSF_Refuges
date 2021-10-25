const ChienModel = require("../models/chien.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadChien = async (req, res) => {
  try {
    if (
      req.files.detectedMimeType != "image/jpg" &&
      req.files.detectedMimeType != "image/png" &&
      req.files.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");
  } catch (err) {
    return res.status(201).json(err);
  }

  const fileName = req.body.name + ".jpg";
  try {
    await pipeline(
      req.files.imageUrl,
      fs.createWriteStream(
        `${__dirname}../../../admin/public/uploads/chiens/${fileName}`
      )
    );
  } catch (err) {
    return res.status(201).json(err);
  }
};
