const Product = require("../models/ProductModel.js");

exports.create = async(req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không có dữ liệu gửi!"
    });
  }
  const product = new Product({
    name : req.body.name,
    decription : req.body.decription,
    thumbnail : req.body.thumbnail,
    price : req.body.price,
    promotion : req.body.promotion,
    isfreeship : req.body.isfreeship,
    createdby : req.body.createdby,
    updatedby : req.body.updatedby,
    idcategory:req.body.idcategory,
    idmanu:req.body.idmanu

  });
  await Product.create( product,(err, data) => {
    if (err)
      res.status(400).send({message:err});
    else res.status(200).send(data);
  });

};
exports.get = async(req, res) => {
  const{productid} =req.params
  const product = new Product({
    idproduct:productid

  });
  await Product.get( product,(err, data) => {
    if (err)
      res.status(400).send({message:err});
    else res.status(200).send(data);
  });
};
exports.getAll = async(req, res) => {
  const{_limit,_page,_sort,promotion,category,isfreeship,manufacturer,gte,lte} =req.query
  const filters = {
    _limit:_limit||9,
    _page:_page||1,
    _sort:_sort,
    promotion:promotion,
    isfreeship: isfreeship,
    idmanu:manufacturer,
    idcategory:category,
    gte:gte,
    lte:lte,

  };
  await Product.getAll( filters,(err, data) => {
    if (err)
      res.status(400).send({message:err});
    else res.status(200).send(data);
  });
};