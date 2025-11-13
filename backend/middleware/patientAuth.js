function authorizeSelfPatient(req, res, next) {
  const { patient, patientId } = req.query;

  if (patient !== "true") {
    return res.status(401).json({ message: "Access denied" });
  }
// force to same id
  if (patientId && String(patientId) !== String(req.params.userId)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  req.role = "patient";
  return next();
}

module.exports = authorizeSelfPatient;