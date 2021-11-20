const Category = require("../models/CategoryModel.js");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const category = new Category({
    name: req.body.name,
    decription: req.body.decription,
    createdby: req.body.createdby,
    updatedby: req.body.updatedby,
  });
  await Category.create(category, (err, data) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(data);
  });
};
exports.getAll = async (req, res) => {
  await Category.getAll((err, data) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(data);
  });
};
