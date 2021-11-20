const sql = require("./index.js");

const Category = function (category) {
  this.idcategory = category.idcategory;
  this.name = category.name;
  this.decription = category.decription;
  this.createdby = category.createdby;
  this.updatedby = category.updatedby;
};

Category.create = async (data, result) => {
  const query = `INSERT INTO category (name,decription,createdby,updatedby) values (?,?,?,?);
    SELECT * FROM category where idcategory=LAST_INSERT_ID()
    `;
  sql.query(
    query,
    [data.name, data.decription, data.createdby, data.updatedby],
    (err, res) => {
      try {
        if (err) {
          throw err.code === "ER_DUP_ENTRY"
            ? "Danh mục đã tồn tại!"
            : "Không thể thêm danh mục!";
        }
        if (res.length) {
          result(null, res[1]);
          return;
        }
        throw "Không thể thêm danh mục!";
      } catch (error) {
        result(error, null);
      }
    }
  );
};

Category.getAll = async (result) => {
  const query = `SELECT distinct category.*,categorydetail.idmanu FROM category,categorydetail where category.idcategory=categorydetail.idcategory;
     SELECT manufacturer.* from manufacturer;
    `;
  sql.query(query, (err, res) => {
    try {
      if (err) {
        throw "Không tìm thấy danh mục!";
      }
      if (res.length) {
        const data = res[0].map((x) => ({
          ...x,
          manufacturer: res[1].filter((y) => y.idmanu == x.idmanu)[0],
        }));
        console.log(typeof data);
        result(null, data);
        return;
      }
      throw "Không tìm thấy danh mục!";
    } catch (error) {
      result(error, null);
    }
  });
};
module.exports = Category;
