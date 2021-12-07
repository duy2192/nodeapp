const sql = require("./index.js");

const Categories = {
  async create(data, result) {
    const query = `INSERT INTO categories (name,decription,createdby,updatedby) values (?,?,?,?);    `;
    sql.query(
      query,
      [data.name, data.decription, data.createdby, data.updatedby],
      (err, res) => {
        try {
          if (err) {
            throw err.code === "ER_DUP_ENTRY"
              ? "Danh mục đã tồn tại!"
              : "Không thể thêm danh mục!";
          } else {
            result(null, "Thêm danh mục thành công");
            return;
          }
        } catch (error) {
          result(error, null);
        }
      }
    );
  },

  async getAll(result) {
    const query = `SELECT distinct categories.* FROM categories order by categories.categoryid ASC;
     SELECT distinct manufacturer.*,categories.categoryid from manufacturer,categories,product where manufacturer.manuid=product.manuid and categories.categoryid=product.categoryid;
    `;
    sql.query(query, (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy danh mục!";
        }
        if (res.length) {
          const data = res[0].map((x) => ({
            ...x,
            manufacturer: res[1].filter((y) => y.categoryid == x.categoryid),
          }));
          result(null, data);
          return;
        }
        throw "Không tìm thấy danh mục!";
      } catch (error) {
        result(error, null);
      }
    });
  },
  async get(result) {
    const query = `SELECT * from categories`;
    sql.query(query, (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy danh mục!";
        }
        if (res.length) {
          result(null, res);
          return;
        }
        throw "Không tìm thấy danh mục!";
      } catch (error) {
        result(error, null);
      }
    });
  },
  async getByManuId(data, result) {
    let query = `SELECT distinct categories.* from categories,manufacturer,product `;
    query +=
      data.manuid !== ""
        ? `where product.categoryid=categories.categoryid and product.manuid=manufacturer.manuid and manufacturer.manuid=?`
        : "";
    sql.query(query, [data.manuid], (err, res) => {
      try {
        if (err) {
          throw "Không tìm thấy danh mục!";
        }
        if (res.length) {
          result(null, res);
          return;
        }
        throw "Không tìm thấy danh mục!";
      } catch (error) {
        result(error, null);
      }
    });
  },
};
module.exports = Categories;
