
import modelOptions from "./model.options.js";
import mongoose from "mongoose";

export default mongoose.model(
  "Favorite",
  mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      enum: ["movie", "tv"],
    },
    mediaId: {
      type: Number,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
    mediaPoster: {
      type: String,
      required: true,
    },
    mediaRate: {
        type: Number,
        required: true,
    }
  }),
  modelOptions
);


