const Company = require("../model/company");
const CompanyUser = require("../model/companyUser");

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

exports.postCompanyFloorPlan = async (req, res, next) => {
  const floorName = req.body.floorName;
  const bookStatus = req.body.bookStatus;
  const registerId = req.params.id;
  // console.log(floorName, bookStatus, registerId);

  try {
    const company = await Company.findById(registerId);
    if (!company) {
      const err = new Error("Company not found");
      err.statusCode = 404;
      throw err;
    }
    await company.addFloorPlan(floorName, bookStatus);
    res.status(200).json({ message: "company details added successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

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
