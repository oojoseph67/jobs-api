const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { unHash } = require("../utils/hash");

const register = async (req, res) => {
  try {
    const { body } = req;
    // const { name, email, password } = body;

    const user = await User.create({ ...body });
    const { _id: userId, name, email } = user;

    const token = jwt.sign({ userId, name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.status(StatusCodes.CREATED).json({
      msg: `user created with name ${name}`,
      token,
      user: { name, email },
    });
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);
  }
};

const login = async (req, res) => {
  const { body } = req;
  const { email, password: requestPassword } = body;

  if (!email || !requestPassword) {
    throw new BadRequestError("Please provide both email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const {
    _id: userId,
    name: checkedName,
    email: checkedUserEmail,
    password: databasePassword,
  } = user;

  const isMatch = await unHash(requestPassword, databasePassword);
  if (!isMatch) {
    throw new UnauthenticatedError("Wrong Password");
  }

  const token = jwt.sign({ userId, checkedName }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(StatusCodes.OK).json({
    msg: `user exists with name ${checkedName}`,
    token,
    user: { checkedName, checkedUserEmail },
  });
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
