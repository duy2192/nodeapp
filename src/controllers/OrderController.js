const Order = require("../models/OrderModel.js");

exports.create =async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!",
    });
  }
  const order = new Order({
    orderdetail: req.body.data,
    iduser: req.body.iduser,
  });
  await Order.create(order, (err, data) => {
    if (err) res.status(400).send({  message: err });
    else
      res.status(200).send(data);
  });
};
