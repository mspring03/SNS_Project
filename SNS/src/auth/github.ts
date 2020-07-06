import GitHub from "passport-github";
import passport from "passport";
import path from 'path';
import * as dotenv from "dotenv";
import { User } from "../models/user";

const GitHubStrategy = GitHub.Strategy
dotenv.config({ path: path.join(__dirname, '../../.env') });

passport.use(new GitHubStrategy({
    clientID: "045649b62fdd736a67fe",
    clientSecret: "d31d36e0d932281bb211020f936670813705c11d",
    callbackURL: "http://10.156.145.143:8080/api/auth/github/callback",
    scope: [ 'user:email' ],
}, async function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    
    if(!await User.findOne({ where: { email: profile.emails[0].value }})){
        await User.create({ 
            email: profile.emails[0].value,
            password: `${profile._json.id}${profile._json.node_id}`,
            nickName: profile._json.login
        });
    }

    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;