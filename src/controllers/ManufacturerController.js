const Manufacturer = require("../models/ManufacturerModel.js");

exports.create = async(req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    name: req.body.name,
    decription: req.body.decription,
    createdby: req.body.createdby,
    updatedby: req.body.updatedby,
  };
  await Manufacturer.create(data, (err, result) => {
    if (err)
      res.status(200).send({
        message: err,
      });
    else
      res.status(200).send({
        result,
      });
  });
};
exports.get = async (req, res) => {
  await Manufacturer.get((err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
};

exports.getByCategoryId = async (req, res) => {
  const data={
    categoryid:req.params.categoryid||""
  }
  await Manufacturer.getByCategoryId(data,(err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
};