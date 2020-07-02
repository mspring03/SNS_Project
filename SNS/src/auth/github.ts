import GitHub from "passport-github";
import passport from "passport";
import path from 'path';
import * as dotenv from "dotenv";
// import { User } from "../models/user";

const GitHubStrategy = GitHub.Strategy
dotenv.config({ path: path.join(__dirname, '../../.env') });

passport.use(new GitHubStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://10.156.145.143:3000/api/auth/github/callback"
  },

  function(accessToken, refreshToken, profile, cb) {

  }
));

module.exports = passport;