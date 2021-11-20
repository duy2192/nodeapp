const Category = require("../controllers/CategoryController.js");
const router = require("express").Router();

router.post("/",Category.create)
router.get("/",Category.getAll)


module.exports = router;
