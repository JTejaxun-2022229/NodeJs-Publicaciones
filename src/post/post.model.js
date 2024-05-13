import { Schema, model } from 'mongoose'

const PostSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: false,

    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    },
},
    { timestamps: true }
)

export default model("Post", PostSchema)