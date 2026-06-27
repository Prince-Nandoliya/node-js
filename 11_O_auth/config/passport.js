import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import passport from "passport"
import googlePassport from "passport-google-oauth20"

import user from "../model/usermodel.js"



const googleStrategy = googlePassport.Strategy;


passport.use(
    new googleStrategy(
        {
            clientID: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            callbackURL: "http://localhost:5000/auth/google/login"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                let User = await user.findOne({ googelId: profile.id })

                if (!user) {
                    user = await User.create({
                        googelId: profile.id,
                        name: profile.displayName,
                        email: profile.email[0]?.value,
                    })
                }

                return done(null, user)

            } catch (error) {
                return done(error, null)
            }
        }
    )
)

export default passport