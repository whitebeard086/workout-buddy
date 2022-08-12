const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // check if there is a token in the header
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];

  // verify the token
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Authorization failed" });
  }
};

module.exports = requireAuth;