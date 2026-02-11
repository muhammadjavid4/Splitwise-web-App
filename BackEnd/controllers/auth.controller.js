const authService = require("../services/auth.services");

exports.register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json({
      message: "User registered successfully",
      ...data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.json({
      message: "Login successful",
      ...data,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

exports.logout = (req, res) => {
  return res.json({
    message: "Logout successful"
  });
};
