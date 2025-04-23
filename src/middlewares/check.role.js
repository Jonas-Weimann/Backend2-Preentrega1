export const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user)
      return res
        .status(401)
        .json({ status: "error", error: "User not authenticated" });
    return req.user.role === role
      ? next()
      : res.status(403).json({ status: "error", error: "Unauthorized" });
  };
};
