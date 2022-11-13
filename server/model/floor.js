const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const floorSchema = new Schema(
  {
    floorNumber: {
      type: Number,
      required: true,
    },
    roomCapacity: {
      type: Number,
      required: true,
    },
    deskCapacity: {
      type: Number,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    rooms: [
      {
        roomNo: {
          type: Number,
          required: true,
        },
        desks: [
          {
            deskNo: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Floor", floorSchema);
