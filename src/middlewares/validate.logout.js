export const validateLogOut = (req, res, next) => {
  if (req.cookies.token) res.status(401).send({ error: "Already logged in" });
  else next();
};
