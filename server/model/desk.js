const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deskSchema = new Schema(
  {
    floor: {
      type: Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    deskName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Desk", deskSchema);
