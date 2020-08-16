const NSE = require("../modals/NSESchema");

exports.getAllData = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["sort"];
    excludeFields.forEach((x) => delete queryObj[x]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let allData = await NSE.find(JSON.parse(queryStr)).sort("Date");

    res.status(200).json({
      status: "success",
      results: allData.length,
      data: {
        allData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fAiled",
      message: err,
    });
  }
};

exports.createData = async (req, res) => {
  try {
    let reqBody = req.body;

    let p = reqBody.Date;
    let q = p.split("-");
    let r = q[0] + q[1] + q[2];
    let s = parseInt(r);
    reqBody.Date = s;
    console.log(reqBody);

    const newData = await NSE.create(reqBody);

    res.status(201).json({
      status: "success",
      data: {
        impData: newData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateData = async (req, res) => {
  try {
    const UndatedData = await NSE.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        UndatedData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteData = async (req, res) => {
  try {
    await NSE.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: "success",
      message: "deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
