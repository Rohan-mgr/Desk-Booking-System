const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const floorSchema = new Schema(
  {
    floorName: {
      type: String,
      required: true,
    },
    roomCapacity: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Floor", floorSchema);
