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

                let existingUser  = await user.findOne({ googleId: profile.id })

                if (!existingUser ) {
                    existingUser  = await user.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0]?.value,
                    })
                }

                return done(null, existingUser)

            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    try {
        
        const existingUser = await user.findById(id)

        done(null,existingUser)


    } catch (error) {
        done(error,null)
    }
})
export default passport