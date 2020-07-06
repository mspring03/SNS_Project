import FaceBook from "passport-facebook";
import passport from "passport";
import path from 'path';
import * as dotenv from "dotenv";
import { User } from "../models/user";

const FaceBookStrategy = FaceBook.Strategy
dotenv.config({ path: path.join(__dirname, '../../.env') });

passport.use(new FaceBookStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:8080/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'link', 'email']
}, async function(accessToken, refreshToken, profile, cb) {
    if(!await User.findOne({ where: { email: profile._json.email }})){
        await User.create({ 
            email: profile._json.email,
            password: `${profile._json.id}${profile._json.email}`,
            nickName: profile._json.name
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