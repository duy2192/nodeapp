const sql = require("./index.js");

const Product = function (product) {
  this.idproduct = product.idproduct;
  this.name = product.name;
  this.decription = product.decription;
  this.price = product.price;
  this.promotion = product.promotion;
  this.isfreeship = product.isfreeship;
  this.thumbnail = product.thumbnail;
  this.blocked = product.blocked;
  this.createdby = product.createdby;
  this.updatedby = product.updatedby;
  this.idcategory = product.idcategory;
  this.idmanu = product.idmanu;
};

Product.create = async (data, result) => {
  const query = `INSERT INTO product (name,decription,price,promotion,isfreeship,thumbnail,createdby,updatedby) values (?,?,?,?,?,?,?,?);
  select @idproduct:=last_insert_id() from product;  
  insert into categorydetail(idmanu,idproduct,idcategory,decription,createdby,updatedby) values(?,@idproduct,?,?,?,?);
  SELECT product.* FROM ecommercedb.product where product.idproduct=@idproduct;
  select * from manufacturer where idmanu=?;
  select * from category where idcategory=?;
  `;
  sql.query(
    query,
    [
      data.name,
      data.decription,
      data.price,
      data.promotion,
      data.isfreeship,
      data.thumbnail,
      data.createdby,
      data.updatedby,
      data.idmanu,
      data.idcategory,
      data.decription,
      data.createdby,
      data.updatedby,
      data.idmanu,
      data.idcategory,
    ],
    (err, res) => {
      try {
        if (err) {
          throw err.code === "ER_DUP_ENTRY" ? "Sản phẩm trùng!" : err;
        }
        if (res.length) {
          console.log(res);
          result(null, {
            ...res[3][0],
            manufacturer: res[4][0],
            category: res[5][0],
          });
          return;
        }
        throw "Lỗi tạo sản phẩm";
      } catch (error) {
        result(error, null);
      }
    }
  );
};

Product.get = async (data, result) => {
  const query = `SELECT * FROM product where idproduct=?;
   SELECT category.* FROM category,categorydetail where category.idcategory=categorydetail.idcategory and categorydetail.idproduct=?;
   SELECT manufacturer.* FROM manufacturer,categorydetail where manufacturer.idmanu=categorydetail.idmanu and categorydetail.idproduct=?;
  
  `;
  sql.query(
    query,
    [data.idproduct, data.idproduct, data.idproduct],
    (err, res) => {
      try {
        if (err) {
          throw "Lỗi tìm sản phẩm!";
        }
        if (res.length) {
          result(null, {
            ...res[0][0],
            category: res[1][0],
            manufacturer: res[2][0],
          });
          return;
        }
        throw "Không tìm thấy sản phẩm này!";
      } catch (error) {
        result(error, null);
      }
    }
  );
};
Product.getAll = async (filters, result) => {
  const page=Number.parseInt(filters._page)*Number.parseInt(filters._limit)-Number.parseInt(filters._limit)
  let query = `SELECT *,categorydetail.idmanu,categorydetail.idcategory FROM product,categorydetail where categorydetail.idproduct=product.idproduct `;
  query+=filters.idcategory?sql.format(` and categorydetail.idcategory=cast(? as unsigned) `,filters.idcategory):" " 
  query+=filters.idmanu?sql.format(` and categorydetail.idmanu=cast(? as unsigned) `,filters.idmanu):" " 
  query+=Boolean(filters.promotion)?` and promotion>=0 `:" " 
  query+=Boolean(filters.isfreeship)?` and isfreeship like 'true' `:" " 
  query+=filters._sort?sql.format(` order by ${filters._sort.split(':')[0]}`):"order by product.idproduct DESC " 
  query+=filters._sort.split(':')==="ASC"?sql.format(` ASC`):" DESC " 
  query+=page?sql.format(` limit ${page},`):" limit 0," 
  query+=filters._limit?sql.format(` ${filters._limit} `):"9" 


  query+=`;SELECT * FROM category `
  query+=filters.idcategory?sql.format(`where idcategory=cast(? as unsigned);`,filters.idcategory):";"
  query+=  `SELECT * FROM manufacturer `
  query+=filters.idmanu?sql.format(`where idmanu=cast(? as unsigned);`,filters.idmanu):";"

  sql.query(query, [filters.idproduct], (err, res) => {
    try {
      if (err) {
        throw "Lỗi tìm sản phẩm!";
      }
      if (res.length) {
        const data = res[0].map((x) => ({
          ...x,
          category: res[1].filter((y) => y.idcategory == x.idcategory)[0],
          manufacturer: res[2].filter((y) => y.idmanu == x.idmanu)[0],
        }));
        result(null, data);
        return;
      }
      throw "Không tìm thấy sản phẩm này!";
    } catch (error) {
      result(error, null);
    }
  });
};
module.exports = Product;
