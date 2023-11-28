const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createError = require("../util/createError");
const { User } = require("../models");

exports.authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    console.log(authorization);
    createError("You are unauthorized", 401);
  }

  const [, token] = authorization.split(" ");
  if (!token) {
    createError("You are unauthorized", 401);
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(payload);
  const user = await User.findOne({
    where: { id: payload.id },
    // attributes: { exclude: ["password"] },
  });
  if (!user) {
    createError("user not found", 400);
  }
  req.user = user;
  res.status(200).json({ user });
  res.json({ token: token });
  next();
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username) {
      createError("Username is required.", 400);
    }
    if (!password) {
      createError("Password is required.", 400);
    }

    if (password !== confirmPassword) {
      createError("Passwords do not match.", 400);
    }

    if (password.length < 6) {
      createError("Password must be at least 6 characters.", 400);
    }
    if (!email) {
      createError("Email is required.", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    next(error);
  }
};

const genToken = (payload) => {
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      createError("username is required", 400);
    }
    if (!password) {
      createError("password is required", 400);
    }
    if (password.length < 6) {
      createError("password must be at least 6 characters", 400);
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      createError("username or password is not correct", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      createError("username or password is not correct", 400);
    }
    // console.log(JSON.stringify(user, null, 2));

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    console.log(token);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
    //   console.log(await bcrypt.compare(oldPassword, req.user.password));
    //   const isMatch = await bcrypt.compare(oldPassword, req.user.password);
    //   if (!isMatch) {
    //     createError("invalid password", 400);
    //   }
    const userId = req.user.id;
    let hashedPassword;
    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        createError("new passwords do not match", 400);
      }
      if (!newPassword) {
        createError("new password is required", 400);
      }
      if (newPassword.length < 6) {
        createError("new password must be at least 6 characters", 400);
      }
      hashedPassword = await bcrypt.hash(newPassword, "10");
    }
    const result = await User.update(
      {
        email,
        password: hashedPassword,

        lastUpdatedPassword: new Date(),
      },
      { where: { id: userId } }
    );

    res.status(200).json({ message: "user updated successfully", result });
  } catch (error) {
    next(error);
  }
};
