const User = require("../controllers/UserController.js");
const router = require("express").Router();

router.post("/login",User.login)
router.post("/register",User.register)


module.exports = router;
