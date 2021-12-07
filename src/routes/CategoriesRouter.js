const Categories = require("../controllers/CategoriesController.js");
const router = require("express").Router();

router.post("/",Categories.create)
router.get("/all",Categories.getAll)
router.get("/",Categories.get)
router.get("/bymanuid/:manuid",Categories.getByManuId)
router.get("/bymanuid/",Categories.getByManuId)


module.exports = router;
