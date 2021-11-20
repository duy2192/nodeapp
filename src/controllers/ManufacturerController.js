const Manufacturer = require("../models/ManufacturerModel.js");

exports.create = async(req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const manufacturer = new Manufacturer({
    name: req.body.name,
    decription: req.body.decription,
    createdby: req.body.createdby,
    updatedby: req.body.updatedby,
  });
  await Manufacturer.create(manufacturer, (err, data) => {
    if (err)
      res.status(200).send({
        message: err,
      });
    else
      res.status(200).send({
        data,
      });
  });
};
