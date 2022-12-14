import express from "express";
const { Router } = express;
const router = new Router();

import upload from "../utils/multer.js";
import passport from "../utils/passport.js";

import AuthController from "../controllers/auth.js";
const controller = new AuthController();

router.get("/", async (req, res) => {
    res.redirect("/home")
});

router.post(
    "/login",
    passport.authenticate("local-login", {
        successRedirect: "/home?statusCart=true",
        failureRedirect: "/failLogin",
    })
);
router.get("/login", controller.getLogin);

router.post(
    "/signup",
    upload.single("userPhoto"),
    passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/failSignup",
    })
);

router.get("/signup", controller.getSignup);

router.get("/failLogin", controller.getFailLogin);

router.get("/failSignup", controller.getFailSignup);

router.post("/logout", controller.postLogout);

export default router;
