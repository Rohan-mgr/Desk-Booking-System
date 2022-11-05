const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "CompanyUser",
      required: true,
    },
  },
  { timestamps: true }
);

// companySchema.methods.addFloorPlan = function (name, status) {
//   const updatedFloorPlan = [...this.floorPlan.floors];
//   updatedFloorPlan.push({
//     floorName: name,
//     bookStatus: status,
//   });
//   const updatedFloor = {
//     floors: updatedFloorPlan,
//   };
//   this.floorPlan = updatedFloor;
//   return this.save();
// };

module.exports = mongoose.model("Company", companySchema);
