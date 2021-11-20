const User = require("../models/UserModel.js");

exports.login = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Thiếu dữ liệu!" });
    }
    const user = new User({
      email: req.body.identifier,
      username: req.body.identifier,
      password: req.body.password,
    });
    await User.login(user, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (error) {
    res.status(400).send({ message: "Lỗi không thể đăng nhập!" });
  }
};

exports.register = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Thiếu dữ liệu!" });
  }
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    name: req.body.fullname,
    repassword: req.body.repassword,
  });
  if (user.password !== user.repassword) {
    res.status(400).send({
      message: "Mật khẩu xác thực không đúng!",
    });
  }
  await User.register(user, (err, data) => {
    try {
      if (err) res.status(400).send(err);
      else res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ message: "Đăng ký tài khoản không thành công!" });
    }
  });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  User.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    else res.send(data);
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Users
exports.findAllPublished = (req, res) => {
  User.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    else res.send(data);
  });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  User.updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
