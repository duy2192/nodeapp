import ManufacturerModel from "../models/ManufacturerModel.js";
const ManufacturerController={
create : async(req, res) => {
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
  await ManufacturerModel.create(data, (err, result) => {
    if (err)
      res.status(200).send({
        message: err,
      });
    else
      res.status(200).send({
        result,
      });
  })},
get : async (req, res) => {
  await ManufacturerModel.get((err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
},
getByCategoryId : async (req, res) => {
  const data={
    categoryid:req.params.categoryid||""
  }
  await ManufacturerModel.getByCategoryId(data,(err, result) => {
    if (err)
      res.status(400).send({
        message: err,
      });
    else res.status(200).send(result);
  });
},
}
export default ManufacturerController