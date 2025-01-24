import express from "express";
import Joi from "joi";
import sendResponce from "../helpers/sendResponce.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


const router = express.Router()

const registerSchema = Joi.object({
    name: Joi.string().max(10).min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(10).min(4).required(),
    role: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(10).min(4).required(),
})

router.post("/register", async (req, res) => {
    try {
        const { value, error } = registerSchema.validate(req.body)

        if (error) return sendResponce(res, 404, true, null, error.message)
        const { name, email, password, role } = value

        const userExisted = await User.findOne({ email })
        if (userExisted) return sendResponce(res, 404, true, null, "User already existed")
        const hashPassword = await bcrypt.hash(password, 10)
        let newUser = new User({
            name,
            email,
            password: hashPassword,
            role
        })
        newUser = await newUser.save()
        return sendResponce(res, 202, false, newUser, "User created successfully")
    } catch (error) {
        console.log("===========Internal Server Error==========", error)
        return sendResponce(res, 404, error, null, "Internal Server Error")
    }
})

router.post("/login", async (req, res) => {
    try {
        const { value, error } = loginSchema.validate(req.body)

        if (error) return sendResponce(res, 404, true, null, error.message)
        const { email, password } = value

        const userExisted = await User.findOne({ email })
        if (!userExisted) return sendResponce(res, 404, true, null, "User not register")

        const comparePassword = bcrypt.compare(password, userExisted.password)
        if (!comparePassword) return sendResponce(res, 404, true, null, "Invalied Password")

        const token = jwt.sign(userExisted.id, process.env.AUTH_SECRET)
        return sendResponce(res, 202, false, {
            user: userExisted,
            token
        }, "Login successfull")


    } catch (error) {
        console.log("===========Internal Server Error==========", error)
        return sendResponce(res, 404, error, null, "Internal Server Error")
    }
})

export { router as authRoutes }