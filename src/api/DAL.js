import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURI: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '86903fc2-0705-47d7-9513-c2f9a3e41faa'
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(id) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(id) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    getProfileInfo(id) {
        return instance.get(id == null ? "https://social-network.samuraijs.com/api/1.0/profile/18225" : `https://social-network.samuraijs.com/api/1.0/profile/` + id)
    },
    getAuthData() {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
    }
}


