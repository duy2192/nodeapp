const Categories = require("../models/CategoriesModel.js");

exports.create = async (req, res) => {
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
  await Categories.create(data, (err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
};
exports.getAll = async (req, res) => {
  await Categories.getAll((err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
};
exports.get = async (req, res) => {
  await Categories.get((err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
};

exports.getByManuId = async (req, res) => {
  const data={
    manuid:req.params.manuid||""
  }
  await Categories.getByManuId(data,(err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
};

