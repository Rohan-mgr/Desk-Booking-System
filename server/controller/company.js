const { default: mongoose } = require("mongoose");
const Company = require("../model/company");
const CompanyUser = require("../model/companyUser");
const Floor = require("../model/floor");
const Room = require("../model/room");
const Desk = require("../model/desk");

exports.getCompanies = async (req, res, next) => {
  const userMode = req.params.mode;
  // console.log(userMode, req.userId, "backend");
  let companies;
  try {
    if (userMode === "user") {
      companies = await Company.find();
    } else {
      companies = await Company.find({ owner: req.userId });
    }
    if (!companies) {
      const error = new Error("No companies is created");
      throw error;
    }
    res
      .status(200)
      .json({ message: "companies fetched successfully", result: companies });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getCompanyFloors = async (req, res, next) => {
  const companyId = req.params.cId;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      const error = new Error("Company not found");
      error.statusCode = 404;
      throw error;
    }
    const { floors } = await company.populate("floors");
    res.status(200).json({
      message: "floors fetched successfully",
      results: floors,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getFloorRooms = async (req, res, next) => {
  const floorId = req.params.fId;
  console.log(floorId, "floorId");
  try {
    const floor = await Floor.findById(floorId);
    if (!floor) {
      const error = new Error("floor not found");
      error.statusCode = 404;
      throw error;
    }
    const { rooms } = await floor.populate("rooms");
    res.status(200).json({
      message: "rooms fetched successfully",
      results: rooms,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postCompanyInfo = async (req, res, next) => {
  const companyName = req.body.companyName;
  const ownerFirstName = req.body.ownerFirstName;
  const ownerLastName = req.body.ownerLastName;
  const contactNumber = req.body.contactNumber;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const workEmail = req.body.email;
  // console.log(
  //   companyName,
  //   ownerFirstName,
  //   ownerLastName,
  //   contactNumber,
  //   street,
  //   city,
  //   state,
  //   country,
  //   workEmail
  // );
  let dupCompany;
  try {
    dupCompany = await Company.findOne({
      workEmail: workEmail,
      companyName: companyName,
    });
    if (dupCompany) {
      const error = new Error("Company Already Exists!");
      error.statusCode = 409;
      throw error;
    }
    const company = new Company({
      companyName: companyName,
      companyOwner: {
        fname: ownerFirstName,
        lname: ownerLastName,
      },
      contactNumber: contactNumber,
      address: {
        street: street,
        city: city,
        state: state,
        country: country,
      },
      workEmail: workEmail,
      owner: req.userId,
      // floorPlan: { floors: [] },
    });
    const result = await company.save();
    const companyuser = await CompanyUser.findById(req.userId);
    companyuser.companies.push(company);
    await companyuser.save();
    res.status(200).json({
      message: "company Info register successfully",
      registerId: result._id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// exports.postCompanyFloorPlan = async (req, res, next) => {
//   const floorName = req.body.floorName;
//   const bookStatus = req.body.bookStatus;
//   const registerId = req.params.id;
//   // console.log(floorName, bookStatus, registerId);

//   try {
//     const company = await Company.findById(registerId);
//     if (!company) {
//       const err = new Error("Company not found");
//       err.statusCode = 404;
//       throw err;
//     }
//     await company.addFloorPlan(floorName, bookStatus);
//     res.status(200).json({ message: "company details added successfully" });
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   }
// };

exports.deleteCompany = async (req, res, next) => {
  const companyId = req.params.cid;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      const error = new Error("Company not found");
      error.statusCode = 404;
      throw error;
    }
    if (company?.owner.toString() !== req.userId.toString()) {
      const error = new Error("Not Authorized");
      error.statusCode = 401;
      throw error;
    }
    await Company.findByIdAndRemove(companyId);
    await Floor.deleteMany({ company: companyId });
    await Room.deleteMany({ company: companyId });
    await Desk.deleteMany({ company: companyId });
    const companyUser = await CompanyUser.findById(req.userId);
    companyUser.companies.pull(companyId);
    await companyUser.save();
    res.status(200).json({ message: "company deleted successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.updateCompany = async (req, res, next) => {
  const companyId = req.params.cid;
  const companyName = req.body.companyName;
  const ownerFirstName = req.body.ownerFirstName;
  const ownerLastName = req.body.ownerLastName;
  const contactNumber = req.body.contactNumber;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const workEmail = req.body.email;
  console.log(
    companyName,
    ownerFirstName,
    ownerLastName,
    contactNumber,
    street,
    city,
    state,
    country,
    workEmail
  );
  try {
    const company = await Company.findById(companyId);
    console.log(company.owner, req.userId);
    if (!company) {
      const err = new Error("Company not found");
      err.statusCode = 404;
      throw err;
    }
    if (company?.owner.toString() !== req.userId) {
      const error = new Error("Not Authorized");
      error.statusCode = 401;
      throw error;
    }
    company.companyName = companyName;
    company.companyOwner.fname = ownerFirstName;
    company.companyOwner.lname = ownerLastName;
    company.contactNumber = contactNumber;
    company.address.street = street;
    company.address.city = city;
    company.address.state = state;
    company.address.country = country;
    company.workEmail = workEmail;

    const result = await company.save();
    res.status(200).json({
      message: "Company updated successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postAddFloor = async (req, res, next) => {
  const companyId = req.params.cid;
  const floorName = req.body.floorName;
  const capacity = req.body.roomCapacity;
  let dupFloor;
  try {
    dupFloor = await Floor.findOne({
      floorName: floorName,
    });
    if (dupFloor) {
      const error = new Error("Floor Name Already Exists!");
      error.statusCode = 409;
      throw error;
    }
    const floor = new Floor({
      floorName: floorName,
      roomCapacity: capacity,
      company: mongoose.Types.ObjectId(companyId),
    });
    await floor.save();
    const company = await Company.findById(companyId);
    company.floors.push(floor);
    await company.save();

    res.status(200).json({ message: "Floor added successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postCompanyRooms = async (req, res, next) => {
  const companyId = req.params.cId;
  const floorId = req.body.floor;
  const roomName = req.body.roomName;
  const deskCapacity = req.body.deskCapacity;
  console.log(floorId, roomName, deskCapacity, "add room");

  let dupRoom;
  try {
    dupRoom = await Room.findOne({
      roomName: roomName,
    });
    if (dupRoom) {
      const error = new Error("Room Name Already Exists!");
      error.statusCode = 409;
      throw error;
    }
    const totalRooms = await Room.find({ floor: floorId }).countDocuments();
    const floor = await Floor.findById(floorId);
    console.log(totalRooms, floor?.roomCapacity);
    if (+totalRooms >= +floor?.roomCapacity) {
      const error = new Error("Room Space not available");
      error.statusCode = 507;
      throw error;
    }
    const room = new Room({
      roomName: roomName,
      roomCapacity: deskCapacity,
      company: mongoose.Types.ObjectId(companyId),
      floor: mongoose.Types.ObjectId(floorId),
    });
    await room.save();

    floor.rooms.push(room);
    await floor.save();

    res.status(200).json({ message: "room added successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postAddDesk = async (req, res, next) => {
  const companyId = req.params.cId;
  const floorId = req.body.floor;
  const roomId = req.body.room;
  const deskName = req.body.deskName;
  console.log(floorId, roomId, deskName);
  let dupDesk;
  try {
    dupDesk = await Desk.findOne({
      deskName: deskName,
    });
    if (dupDesk) {
      const error = new Error("Desk Name Already Exists!");
      error.statusCode = 409;
      throw error;
    }
    const totalDesk = await Desk.find({ room: roomId }).countDocuments();
    const room = await Room.findById(roomId);
    console.log(+room?.roomCapacity, +totalDesk);
    if (+totalDesk >= +room?.roomCapacity) {
      const error = new Error("Desk Space not available");
      error.statusCode = 507;
      throw error;
    }
    const desk = new Desk({
      floor: mongoose.Types.ObjectId(floorId),
      room: mongoose.Types.ObjectId(roomId),
      company: mongoose.Types.ObjectId(companyId),
      deskName: deskName,
    });
    await desk.save();
    room.desks.push(desk);
    await room.save();
    res.status(200).json({ message: "Desk added successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
