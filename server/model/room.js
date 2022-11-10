const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomName: {
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
    floor: {
      type: Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    },
    desks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Desk",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", roomSchema);
