import logger from "../utils/logger.js";

import CartApi from "../services/cart.js";
const cart = new CartApi();

class AuthController {
    constructor() {}

    async getSignup(req, res) {
        try {
            res.render("pages/signup");
        } catch (error) {
            logger.warn(error);
        }
    }

    async getLogin(req, res) {
        try {
            res.render("pages/login");
        } catch (error) {
            logger.warn(error);
        }
    }

    async getFailSignup(req, res) {
        try {
            res.render("pages/failSignup");
        } catch (error) {
            logger.warn(error);
        }
    }
    async getFailLogin(req, res) {
        try {
            res.render("pages/failLogin");
        } catch (error) {
            logger.warn(error);
        }
    }
    async postLogout(req, res) {
        if (req.user) {
            let nameUser = req.user.userName;
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
            });
            res.render("pages/logout", { nameUser });
        }
    }
}

export default AuthController;
