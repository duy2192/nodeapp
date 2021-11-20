const Manufacturer = require("../controllers/ManufacturerController.js");
const router = require("express").Router();

router.post("/",Manufacturer.create)


module.exports = router;
