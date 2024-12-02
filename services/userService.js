const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const utils = require("../utils/utils");
const getUsers = async (email, password) => {
  try {
    const users = await User.find();
    console.log(users, "helloo");
    return users;
  } catch (error) {
    throw Error("Error in Fething Users");
  }
};

const createUser = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("user already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: encryptedPassword });
    newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw Error("not an existing user");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      throw Error("Invalid Password");
    }
    const access_token = await utils.generateAccessToken(existingUser);
    const refresh_token = await utils.generateRefreshToken(existingUser);
    return { access_token, refresh_token, existingUser };
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getUsers, createUser, userLogin };
