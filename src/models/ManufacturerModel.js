const sql = require("./index.js");

const Manufacturer = function (manu) {
  this.idmanu = manu.idmanu;
  this.idproduct = manu.idproduct;
  this.idcategory = manu.idcategory;
  this.name = manu.name;
  this.decription = manu.decription;
  this.createdby = manu.createdby;
  this.updatedby = manu.updatedby;
  this.decriptioninfo = manu.decriptioninfo;
  this.createdbyinfo = manu.createdbyinfo;
  this.updatedbyinfo = manu.updatedbyinfo;
};

Manufacturer.create = async (data, result) => {
  const query = `INSERT INTO manufacturer (name,decription,createdby,updatedby) values (?,?,?,?);
    SELECT * FROM manufacturer ORDER idmanu=LAST_INSERT_ID();
    `;
  sql.query(
    query,
    [data.name, data.decription, data.createdby, data.updatedby],
    (err, res) => {
      try {
        
      if (err) {
        throw err.code === "ER_DUP_ENTRY"
        ? "Hãng sản xuất đã tồn tại!"
        : "Không thể thêm hãng sản xuất1"
      }
      if (res.length) {
        result(null, res[1]);
        return;
      }
      throw "Không thể thêm hãng sản xuất"
      } catch (error) {
        result(error, null);
      }
    }
  );
};
module.exports = Manufacturer;
