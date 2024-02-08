const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const { body } = req;
    const { name, email, password } = body;

    const user = await User.create({ name, email, password });

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);
  }
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};

// const register = async (req, res) => {
//   try {
//     const { body } = req;
//     const { name, email, password } = body;

//     const hashed = await hashedPassword(password);

//     const user = await User.create({ name, email, password: hashed });

//     res.status(StatusCodes.CREATED).json({ user });
//   } catch (error) {
//     console.log("🚀 ~ register ~ error:", error);
//   }
// };
