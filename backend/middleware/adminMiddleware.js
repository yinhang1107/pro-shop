const admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error("Unauthorized");
  }
  next();
};

export default admin;
