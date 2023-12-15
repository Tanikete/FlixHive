import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
    try {
        const {username, password, displayName} = req.body;
        const checkUser = await userModel.findOne({username});
        if (checkUser) return responseHandler.badRequest(res, "Username already exists");
        const user = new userModel();
        user.username = username;
        user.setPassword(password);
        user.displayName = displayName;
        await user.save();
        const token = jsonwebtoken.sign({data: user._id}, process.env.TOKEN_SECRET, {expiresIn: "24h"});
        responseHandler.created(res, {token,...user._doc,id: user._id});
    } catch {
        responseHandler.error(res);
    }

};

const signin = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await userModel.findOne({username}).select("usuername password salt id displayName")
        
        if (!user) return responseHandler.badRequest(res, "User does not exist")
        if (!user.validatePassword(password)) return responseHandler.badRequest(res, "Invalid password")
        const token = jsonwebtoken.sign({data: user._id}, process.env.TOKEN_SECRET, {expiresIn: "24h"});

        user.password - undefined;
        user.salt = undefined;

        responseHandler.created(res, {token,...user._doc,id: user._id});
    } catch {
        responseHandler.error(res);
    }
};

const updatePassword = async (req, res) => {
    try {
        const {password, newPassword} = req.body;
        const user = await userModel.findById(req.user.id).select("password id salt");

        if (!user) return responseHandler.unauthorized(res)
        if (!user.validatePassword(password)) return responseHandler.badRequest(res, "Invalid password");

        user.setPassword(newPassword);
        await user.save();
        responseHandler.ok(res);

    } catch {
        responseHandler.error(res);
    }
};

const getInfo = async (req, res) => {
    try {

        const user = await userModel.findById(req.user.id)
        if (!user) return responseHandler.notfound(res)
        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
};

export default {
    signup,
    signin,
    updatePassword,
    getInfo,
};