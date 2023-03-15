import axios from "axios";
import { toUserMapping } from '../common/mapping/user-mapping'

const API = process.env.API_URL || "http://localhost:5000"

export const postNewUserReq = async (data) => {
    try {
        await axios.post(`${API}/user`, data)
    } catch (error) {
        console.log("Lỗi thêm user", error);
    }
}

export const getUserReq = async () => {
    try {
        const data = await axios.get(`${API}/user`)
        return toUserMapping(data.data)
    } catch (error) {
        console.log('Lỗi lấy data users', error);
    }
}

export const getUserByIdReq = async (id) => {
    try {
        const data = await axios.get(`${API}/user/${id}`)
        console.log('data detail', data.data);
        return data.data
    } catch (error) {
        console.log("Lỗi lấy user", error);
    }
}

export const deleteUserReq = async (id) => {
    try {
        await axios.delete(`${API}/user/${id}`)
    } catch (error) {
        console.log('Lỗi xóa user', error);
    }
}