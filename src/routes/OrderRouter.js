const Order = require("../controllers/OrderController.js");
const router = require("express").Router();

router.post("/",Order.create)


module.exports = router;
