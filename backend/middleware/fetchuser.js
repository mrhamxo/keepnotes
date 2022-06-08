var jwt = require("jsonwebtoken");
const JWT_SECRET = "secretMuhammadHamzaKhattakFromKarakoram";

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and store id in request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Token is not valid" });
  }
};

module.exports = fetchuser;
