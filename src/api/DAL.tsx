import axios from "axios";
import {PhotosType, ProfileType} from "../Redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7da9c6ee-8c54-4e71-93f3-f4d88271a341'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(id: number) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(id: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => {
                return response.data
            })
    }
}

type PhotoAnswer = {
    resultCode: number
    messages: Array<string>
    data: {
        photos: PhotosType
    }
}


export const profileAPI = {
    getProfileInfo(id: number | null) {
        return instance.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/` + id).then(res => res.data)
    },
    getUserStatus(id: number | null) {
        return instance.get<string>(`https://social-network.samuraijs.com/api/1.0/profile/status/` + id).then( res => res.data)
    },
    updateUserStatus(status: string) {
        return instance.put<PutDeleteAnswerType>('https://social-network.samuraijs.com/api/1.0/profile/status', { status })
    },
    updateUserInfo(data: ProfileType) {
        return instance.put<PutDeleteAnswerType>('https://social-network.samuraijs.com/api/1.0/profile',  data)
    },
    updatePhoto(photo: any) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put<PhotoAnswer>('https://social-network.samuraijs.com/api/1.0/profile/photo', formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
 }

 type AuthMe = {
     resultCode: number
     messages: Array<string>,
     data: {
         id: number
         email: string
         login: string
     }
 }

 type LoginAuth = {
     resultCode: number
     messages: Array<string>
     data: {
         id: number
     }
 }

 type PutDeleteAnswerType = {
     resultCode: number
     messages: Array<string>
     data: Object
 }

 export enum ResultCode {
     Success = 0,
     Error = 1,
 }

 export enum ResultCodeCaptcha {
     Required = 10
 }

export const authAPI = {
    getAuthData() {
        return instance.get<AuthMe>(`https://social-network.samuraijs.com/api/1.0/auth/me`).then( (res) => res.data)
    },
    loginAuth(email: string, password: string, rememberMe: boolean, captcha: boolean) {
        return instance.post<LoginAuth>(`https://social-network.samuraijs.com/api/1.0/auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logoutAuth() {
        return instance.delete<PutDeleteAnswerType>(`https://social-network.samuraijs.com/api/1.0/auth/login`).then(res => res.data)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{url: string}>(`https://social-network.samuraijs.com/api/1.0//security/get-captcha-url`).then( res => res.data)
    }
}
