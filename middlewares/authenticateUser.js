import sendResponce from "../helpers/sendResponce.js"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const authenticateUser = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization
        if(!bearer) return sendResponce(res, 402, true, null, "token not provided")

        const token = bearer.split(' ')[1]
        
        const data = jwt.verify(token, process.env.JWT_SECRATE)
        if(!data) return sendResponce(res, 402, true, null, "user not valied")

        const user = await User.findById(data)
        req.user = user
        next()
    }
    catch (error) {
        return sendResponce(res, 402, true, null, `Internal server error ${error}`, error)
    }
}

export default authenticateUser