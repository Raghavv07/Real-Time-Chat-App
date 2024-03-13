let User = require("../models/user.model");
let bcryptjs = require("bcryptjs");
let generateTokenAndSetCookie = require("../utils/generateToken");

exports.signUp = async (req, res) => {
  try {
    let { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    let hashedPassword = await bcryptjs.hash(password, 10);

    let boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    let girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    let newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).send({
        success: true,
        data: newUser,
      });
    } else {
      return res.status(400).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log(`Error in signUp controller ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    let isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username and password" });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(`Error in signUp controller ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out successfully" });
  } catch (error) {
    console.log(`Error in signUp controller ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
