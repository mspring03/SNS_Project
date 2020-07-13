import FaceBook from "passport-facebook";
import passport from "passport";
import path from 'path';
import * as dotenv from "dotenv";
import { User } from "../models/user";
import * as authQurey from "../controller/auth/query";

const FaceBookStrategy = FaceBook.Strategy
dotenv.config({ path: path.join(__dirname, '../../.env') });

passport.use(new FaceBookStrategy({
    clientID: `${process.env.FACEBOOK_CLIENT_ID}`,
    clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
    callbackURL: "http://www.dsm-sns.ml:8080/api/auth/facebook",
    profileFields: ['id', 'displayName', 'link', 'email']
}, async function (accessToken, refreshToken, profile, cb) {
    if (!await User.findOne({ where: { email: profile._json.email } })) {
        const hashingPw = await authQurey.passwordHashing(`${profile._json.id}${profile._json.email}`);

        await User.create({
            email: profile._json.email,
            password: hashingPw,
            nickName: profile._json.name
        });
    }

    return cb(null, profile);
}
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;