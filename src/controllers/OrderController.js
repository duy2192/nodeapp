const Order = require("../models/OrderModel.js");

exports.create =async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const data = {
    orderdetail: req.body.orderdetail,
    userid: req.body.userid||2,
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    district: req.body.district,
    address: req.body.address,
  }
  await Order.create(data, (err, result) => {
    if (err) res.status(400).send({  message: err });
    else
      res.status(200).send(result);
  });
};
