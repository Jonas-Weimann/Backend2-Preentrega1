import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { userService } from "../../services/user.service.js";
import "../config.js";

const cookieExtractor = (req) => {
  return req.cookies.token;
};

const verifyToken = async (jwtPayload, done) => {
  if (!jwtPayload) return done(null, false, { message: "Token not provided" });
  return done(null, jwtPayload);
};

const strategyConfigCookie = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use("current", new Strategy(strategyConfigCookie, verifyToken));

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
