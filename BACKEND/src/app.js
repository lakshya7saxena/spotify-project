import cookieParser from "cookie-parser"
import express from "express"
import authRouter from "./routes/auth.route.js"
import musicRouter from "./routes/music.route.js"
import cors from "cors"
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth/",authRouter)
app.use("/api/music/",musicRouter)
export default app