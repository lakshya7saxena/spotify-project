import cookieParser from "cookie-parser"
import express from "express"
import authRouter from "./routes/auth.route.js"
import musicRouter from "./routes/music.route.js"
import cors from "cors"
const app=express()
app.use(express.json())
app.use(cookieParser())
const allowedOrigins=[
    "http://localhost:5173",
    "https://spotify-project-phi.vercel.app"
]
app.use(cors({
    origin:function(origin,callback){
        if (!origin) {
            return callback(null,true)
        }
        if (allowedOrigins.indexOf(origin)===-1){
            const msg='The CORS policy for this site does not allow access from the specified Origin.'
            return callback(new Error(msg),false)
        }
        return callback(null,true)
    },
    credentials:true
}))
app.use("/api/auth/",authRouter)
app.use("/api/music/",musicRouter)
export default app