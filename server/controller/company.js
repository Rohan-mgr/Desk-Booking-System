const Company = require("../model/company");

exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();
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
      floorPlan: { floors: [] },
    });
    const result = await company.save();
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
  console.log(floorName, bookStatus, registerId);

  try {
    const company = await Company.findById(registerId);
    if (!company) {
      const err = new Error("Company not found");
      err.statusCode = 404;
      throw err;
    }
    console.log(company);
    await company.addFloorPlan(floorName, bookStatus);
    res.status(200).json({ message: "company details added successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
