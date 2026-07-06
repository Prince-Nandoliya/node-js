import HttpError from "./HttpError.js";

const checkauth = (req, res, next) => {
    try {
        if (!req.user) {
            return res.redirect("/auth/login");
        }

        next();
    } catch (error) {
        next(new HttpError(error.message));
    }
};

export default checkauth;