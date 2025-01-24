import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./db.js"
import { authRoutes } from "./routes/auth.js"
import { blogsRoutes } from "./routes/blogs.js"

const app = express()

const PORT = process.env.PORT
app.use(cors("*"))
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/blog", blogsRoutes)
connectDb()


app.listen(PORT, () => {
    console.log(`PORT is Listinig at http://locahost:${PORT}`)
})