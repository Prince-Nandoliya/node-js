import transporter from "../config/Email.js";

import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

const sendEmail = async ({ to, subject, html }) => {
    try {

        const info = await transporter.sendMail({
            from: `"RoyalBite" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        })

        return info

    } catch (error) {
        throw error
    }
}

export default sendEmail