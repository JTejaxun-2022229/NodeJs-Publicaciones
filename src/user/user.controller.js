import User from './user.model.js'
import { genSalt, hashSync, compare } from 'bcrypt'
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

export const createUser = async (req, res) => {

    try {

        const { username, email, password } = req.body
        const salt = await genSalt(10)
        const hashedPassword = await hashSync(password, salt)
        const newUser = new User({ username, email, password: hashedPassword })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {

        res.status(500).json(err)
    }

}

export const getUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json(info)
    } catch (err) {

        res.status(500).json(err)
    }
}

export const updateUser = async (req, res) => {

    try {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password, salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {

        res.status(500).json(err)
    }
}

export const deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({ userId: req.params.id })
        await Comment.deleteMany({ userId: req.params.id })
        res.status(200).json("User has been deleted!")
    } catch (err) {

        res.status(500).json(err)
    }
}

export const login = async (req, res) => {

    try {

        const user = await findOne({ email: req.body.email })

        if (!user) {

            return res.status(404).json("User not found!")
        }

        const match = await compare(req.body.password, user.password)

        if (!match) {

            return res.status(401).json("Wrong credentials!")
        }

        const token = sign({ _id: user._id, username: user.username, email: user.email }, process.env.SECRET, { expiresIn: "3d" })
        const { password, ...info } = user._doc
        res.cookie("token", token).status(200).json(info)
    } catch (err) {

        res.status(500).json(err)
    }
}

export const logout = async (req, res) => {

    try {

        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User logged out successfully!")
    } catch (err) {

        res.status(500).json(err)
    }
}

export const refetch = (req, res) => {

    const token = req.cookies.token
    verify(token, process.env.SECRET, {}, async (err, data) => {

        if (err) {

            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}