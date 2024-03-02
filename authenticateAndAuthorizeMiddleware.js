function authenticateAndAuthorize(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  if (token !== "valid_token") {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  const userRole = req.headers.userrole;

  if (!userRole) {
    return res
      .status(403)
      .json({ message: "Forbidden: No user role provided" });
  }
  if (userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Permissions Denied for Regular User" });
  }
  next();
}

module.exports = authenticateAndAuthorize;
