import { UserModel } from '../models/User.js'

export const createUser = async (req, res) => {
    try {
        const newUser = req.body
        const user = new UserModel(newUser)
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log("xảy ra lỗi khi tạo user", error);
        res.status(500).json({ error: error })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.find()
        res.status(200).json(user)
    } catch (error) {
        console.log("xảy ra lỗi khi lấy thông tin user", error);
        res.status(500).json({ error: error })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        console.log('có lỗi khi lấy thông tin user', error);
        res.status(500).json({ error: error })
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateUser)
    } catch (error) {
        console.log('có lỗi khi cập nhật user', error);
        res.status(500).json({ error: error })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteUser = req.params.id
        const user = await UserModel.findByIdAndDelete(deleteUser)
        console.log('delete user', user);
        res.status(200).json(user)
    } catch (error) {
        console.log('có lỗi khi xóa user', error)
        res.status(500).json({ error: error })
    }
}