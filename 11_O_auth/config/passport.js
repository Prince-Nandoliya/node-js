import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import pasport from "passport-google-oauth20"

import user from "../model/usermodel.js"
import user from "../model/usermodel.js"


pasport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENTID,
            clientsecret: process.env.CLIENTSECRET,
            callbackURL: "http://localhost:5000/auth/google/login"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                let User = await user.findOne({ googelId: profile.id })

                if (!user) {
                    user = await User.create({
                        googelId: profile.id,
                        name: profile.displayName,
                        email: profile.email[0].value,
                    })
                }

                return done(null, user)

            } catch (error) {
                return done(error, null)
            }
        }
    )
)

pasport.newuser((user,done)=>{
    done(null,user.id)
})

pasport.Uniqeuser(async(id,done)=>{
    try {
        
        const user = await user.findById(id)
        done(null,user)
    } catch (error) {
        done(error,null)
    }
})