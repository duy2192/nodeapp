const User = require("../models/UserModel.js");

exports.login = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Thiếu dữ liệu!" });
    }
    const data = {
      email: req.body.identifier,
      username: req.body.identifier,
      password: req.body.password,
    };
    await User.login(data, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
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
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    name: req.body.fullname,
    repassword: req.body.repassword,
  };
  if (data.password !== data.repassword) {
    res.status(400).send({
      message: "Mật khẩu xác thực không đúng!",
    });
  }
  await User.register(data, (err, result) => {
    try {
      if (err) res.status(400).send(err);
      else res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ message: "Đăng ký tài khoản không thành công!" });
    }
  });
};

