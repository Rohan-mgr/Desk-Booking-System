const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyOwner: {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  workEmail: {
    type: String,
    required: true,
  },
  floorPlan: {
    floors: [
      {
        floorName: {
          type: String,
          required: true,
        },
        bookStatus: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

companySchema.methods.addFloorPlan = function (name, status) {
  // const floorNameIndex = this.floorPlan.floors.findIndex((floor) => {
  //   console.log(floor);
  //   return name.toLowerCase() === floor.floorName.toLowerCase();
  // });
  // console.log(this.floorPlan, name);
  // if (floorNameIndex === -1) {
  //   const error = new Error("Floor Name already exists!");
  //   throw error;
  // }
  const updatedFloorPlan = [...this.floorPlan.floors];
  updatedFloorPlan.push({
    floorName: name,
    bookStatus: status,
  });
  const updatedFloor = {
    floors: updatedFloorPlan,
  };
  this.floorPlan = updatedFloor;
  return this.save();
};

module.exports = mongoose.model("Company", companySchema);
