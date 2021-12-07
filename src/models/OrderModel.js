const sql = require("./index.js");

const Order = {
  async create(order, result) {
    const query = `INSERT INTO tblorder (userid,name,email,city,district,address) values (?,?,?,?,?,?);
  SELECT max(orderid) as orderid from tblorder where email=? and status like 'pending'`;

    sql.query(
      query,
      [
        order.userid,
        order.name,
        order.email,
        order.city,
        order.district,
        order.address,
        order.email,
      ],
      (err, res) => {
        try {
          if (err) {
            throw err.code === "ER_DUP_ENTRY"
              ? "Đơn hàng,sản phẩm trùng!"
              : "Đặt hàng không thành công!";
          }
          if (res.length) {
            const orderid = Object.values(JSON.parse(JSON.stringify(res[1])))[0]
              .orderid;
            const orderdetail = order.orderdetail.map((key) => [
              orderid,
              key["productid"],
              key["name"],
              key["price"],
              key["promotion"],
              key["quantity"],
            ]);
            const query2 = `insert into orderdetail (orderid,productid,name,price,promotion,quantity) values ?`;
            sql.query(query2, [orderdetail, orderid], (err, res) => {
              try {
                if (err) {
                  throw err.code === "ER_DUP_ENTRY"
                    ? "Trùng sản phẩm trong đơn hàng!"
                    : "Đặt hàng không thành công!";
                } else {
                  result(null, { message: "Đặt hàng thành công!" });
                  return;
                }
              } catch (error) {
                result(error, null);
              }
            });
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },
};
module.exports = Order;
