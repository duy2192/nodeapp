const Product = require("../controllers/ProductController.js");
const router = require("express").Router();

router.post("/",Product.create)
router.patch("/:productid",Product.update)
router.get("/",Product.getAll)
router.get("/:productid",Product.get)
router.delete("/:productid",Product.delete)


module.exports = router;
