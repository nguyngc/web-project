//  flow: ?admin=true or ?doctor=true
function authorizeUsersAccess(req, res, next) {
  const { admin, doctor } = req.query;

  if (admin === "true") {
    req.role = "admin";
    return next();
  }
  if (doctor === "true") {
    req.role = "doctor";
    return next();
  }
  return res.status(401).json({ message: "Access denied" });
}

module.exports = authorizeUsersAccess;
