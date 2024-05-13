import express, { json } from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'
import multer, { diskStorage } from 'multer'
import { fileURLToPath } from 'url';
import { dirname, join } from "path"
import cookieParser from 'cookie-parser'
import authRoute from './src/user/auth.routes.js'
import userRoute from './src/user/user.routes.js'
import postRoute from './src/post/post.routes.js'
import commentRoute from './src/comment/comment.routes.js'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectDB = async () => {

    try {

        await connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")
    }
    catch (err) {

        console.log(err)
    }
}

config()
app.use(json())
app.use("/images", express.static(join(__dirname, "/images")))
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

const storage = diskStorage({

    destination: (req, file, fn) => {

        fn(null, "images")
    },

    filename: (req, file, fn) => {

        fn(null, req.body.img)

    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {

    res.status(200).json("Image has been uploaded successfully!")
})

app.listen(process.env.PORT, () => {

    connectDB()
    console.log("app is running on port " + process.env.PORT)
})
