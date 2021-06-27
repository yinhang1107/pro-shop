import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401);
    throw new Error("Access denied. No token provided");
  }

  const decoded = jwt.verify(token, process.env.jwtPrivateKey);
  if (!decoded) {
    res.status(400);
    throw new Error("Invalid token");
  }

  req.user = decoded;

  next();
};

export default auth;
