import Google from "passport-google-oauth";
import passport from "passport";
import path from 'path';
import * as dotenv from "dotenv";
import { User } from "../models/user";

const GoogleStrategy = Google.OAuth2Strategy;
dotenv.config({ path: path.join(__dirname, '../../.env') });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.dsm-sns.ml:8080/api/auth/google/callback",
}, async function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const email = profile.emails[0].value
    
    if(!await User.findOne({ where: { email: email }})){
        const nickName = email.split('@');
        await User.create({ 
            email: email,
            password: `${profile.id}${email}`,
            nickName: nickName[0]
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