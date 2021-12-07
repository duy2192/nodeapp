const Manufacturer = require("../controllers/ManufacturerController.js");
const router = require("express").Router();

router.post("/",Manufacturer.create)
router.get("/",Manufacturer.get)
router.get("/bycategoryid/:categoryid",Manufacturer.getByCategoryId)
router.get("/bycategoryid/",Manufacturer.getByCategoryId)

module.exports = router;
