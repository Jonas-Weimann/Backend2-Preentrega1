import passport from "passport";

export const passportCall = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, (error, user, info) => {
      if (error) return next(error);
      if (!user) {
        if (req.originalUrl.startsWith("/api")) {
          return res.status(401).send({
            status: "error",
            error: info.message ? info.message : info.toString(),
          });
        }
        return res.status(401).redirect("/login");
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};
