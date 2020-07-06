import Google from "passport-google-oauth";
import passport from "passport";
import path from 'path';
import * as dotenv from "dotenv";
import { User } from "../models/user";

const GoogleStrategy = Google.OAuth2Strategy;
dotenv.config({ path: path.join(__dirname, '../../.env') });

passport.use(new GoogleStrategy({
    clientID: "443067379227-1qca96rs28gnig9d2njj5pmv34dcenr4.apps.googleusercontent.com",
    clientSecret: "Bj0Gx6gcuKC_eOmIWjrfRaAP",
    callbackURL: "http://10.156.145.143:8080/api/auth/google/callback",
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