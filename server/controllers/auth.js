const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { body } = req;
    // const { name, email, password } = body;

    const user = await User.create({ ...body });
    const { _id: userId, name, email } = user;

    const token = jwt.sign({ userId, name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res
      .status(StatusCodes.CREATED)
      .json({
        msg: `user created with name ${name}`,
        token,
        user: { name, email },
      });
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
