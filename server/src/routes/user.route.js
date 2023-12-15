import express from 'express';
import {body} from 'express-validator';
import favoriteController from '../controllers/favorite.controller.js';
import userController from '../controllers/user.controller.js';
import requestHandler from '../handlers/request.handler.js';
import userModel from '../models/user.model.js';
import TokenMiddleware from '../middleware/token.middleware.js';

const router = express.Router();

router.post("/signup", 
body("username")
.exists().withMessage("username is required")
.isLength({min:0}).withMessage("Username is minimun 8 characters")
.custom(async (value) => {
    const user = await userModel.findOne({username: value});
    if (user) return Promise.reject("Username already exists");
}),
body("password")
.exists().withMessage("Password is required")
.isLength({min:8}).withMessage("Password is minimun 8 characters"),

body("confirmPassword")
.exists().withMessage("Password is required")
.isLength({min:8}).withMessage("confirmPassword is minimun 8 characters")
.custom((value, {req}) => {
    if (value !== req.body.password) throw new Error("Passwords must match");
    return true;
}),
body("displayName")
.exists().withMessage("displayName is required")
.isLength({min:0}).withMessage("displayName is minimun 2 characters"),
requestHandler.validate,
userController.signup
);


router.post("/signin",
body("username")
.exists().withMessage("username is required")
.isLength({min:0}).withMessage("Username is minimun 8 characters"),
body("password")
.exists().withMessage("Password is required")
.isLength({min:8}).withMessage("Password is minimun 8 characters"),
requestHandler.validate,
userController.signin
);

router.put("/update-password",
TokenMiddleware.auth,
body("password")
.exists().withMessage("Password is required")
.isLength({min:8}).withMessage("Password is minimun 8 characters"),
body("newPassword")
.exists().withMessage("Password is required")
.isLength({min:8}).withMessage("Password is minimun 8 characters"),
body("confirmnewPassword")
.exists().withMessage("confirmnewPassword is required")
.isLength({min:8}).withMessage("confirmnewPassword is minimun 8 characters")
.custom((value, {req}) => {
    if (value !== req.body.newPassword) throw new Error("confirmnewPassword must match");
    return true;
}),
requestHandler.validate,
userController.updatePassword
);

router.get(
    "/info",
    TokenMiddleware.auth,
    userController.getInfo
)
router.get(
    "/favorites",
    TokenMiddleware.auth,
    favoriteController.getFavoritesOfUser
);

router.post(
    "/favorites",
    TokenMiddleware.auth,
    body("mediaType")
    .exists().withMessage("mediaType is required")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType must be movie or tv"),
    body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({min:1}).withMessage("mediaId cannot be empty"),
    body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
    .exists().withMessage("mediaRate is required"),
    favoriteController.addFavorite

);

router.delete(
    "/favorites/:favoriteId",
    TokenMiddleware.auth,
    favoriteController.removeFavorite
);
     




export default router;