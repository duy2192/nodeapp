const sql = require("./index.js");

const Order = function (order) {
  this.orderdetail = order.orderdetail;
  this.iduser = order.iduser;
};
Order.create = async (order, result) => {
  const query = `INSERT INTO tblorder (iduser) values (?);
  SELECT max(idorder) as idorder from tblorder where iduser=? and status like 'pending'`;

  sql.query(query, [order.iduser, order.iduser], (err, res) => {
    try {
      if (err) {
        throw err.code === "ER_DUP_ENTRY"
          ? "Đơn hàng,sản phẩm trùng!"
          : "Đơn hàng lỗi1!";
      }
      if (res.length) {
        const idorder = Object.values(JSON.parse(JSON.stringify(res[1])))[0]
          .idorder;
        const orderdetail = order.orderdetail.map((key) => [
          idorder,
          key["idproduct"],
          key["name"],
          key["price"],
          key["promotion"],
          key["quantity"],
        ]);
        const query2 = `insert into orderdetail (idorder,idproduct,name,price,promotion,quantity) values ?;
        select * from tblorder where idorder=?`;
        sql.query(query2, [orderdetail, idorder], (err, res) => {
          try {
            if (err) {
              throw err.code === "ER_DUP_ENTRY"
                ? "Trùng sản phẩm trong đơn hàng!"
                : err.message;
            }
            if (res.length) {
              result(null, res[1]);
              return;
            }
            throw "Tạo đơn hàng thất bại!";
          } catch (error) {
            result(error, null);
          }
        });
        return;
      }
      throw "Tạo đơn hàng thất bại!";
    } catch (error) {
      result(error, null);
    }
  });
};
module.exports = Order;
