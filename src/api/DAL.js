import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURI: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7da9c6ee-8c54-4e71-93f3-f4d88271a341'
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
    }
}

export const profileAPI = {
    getProfileInfo(id) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/` + id)
    },
    getUserStatus(id) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/status/` + id)
    },
    updateUserStatus(status) {
        return instance.put('https://social-network.samuraijs.com/api/1.0/profile/status', { status })
    },
    updatePhoto(photo) {
        var formData = new FormData();
        formData.append('image', photo)
        return instance.put('https://social-network.samuraijs.com/api/1.0/profile/photo', formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
 }

export const authAPI = {
    getAuthData() {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
    },
    loginAuth(email, password, rememberMe) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/auth/login`, { email, password, rememberMe })
    },
    logoutAuth() {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/auth/login`)
    },
}
