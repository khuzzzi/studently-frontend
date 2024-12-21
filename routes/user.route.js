import express from "express"
import {userLogin, userRegister } from "../controllers/user.controller.js"


const Router = express.Router()

Router.route("/signup").post(userRegister)
Router.route("/login").post(userLogin)

export default Router;