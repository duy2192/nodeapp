const Product = require("../controllers/ProductController.js");
const router = require("express").Router();

router.post("/",Product.create)
router.get("/",Product.getAll)
router.get("/:productid",Product.get)


module.exports = router;
