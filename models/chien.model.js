const mongoose = require("mongoose");

const chienSchema = new mongoose.Schema(
  {
    refuge: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    robe: { type: String },
    emplacement: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    age: {
      type: Number,
    },

    sexe: {
      type: String,
    },
    chat: {
      type: String,
    },

    divers: {
      type: String,
    },
    carrousel: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const ChienModel = mongoose.model("chien", chienSchema);
module.exports = ChienModel;
