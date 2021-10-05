import axios from "axios";
import {PhotosType, ProfileType} from "../Redux/profile-reducer";
import {UsersType} from "../Redux/users-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7da9c6ee-8c54-4e71-93f3-f4d88271a341'
    }
})

type GetUsers = {
    "items": Array<UsersType>
    "totalCount": number
    "error": null | string
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsers>(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(id: number) {
        return instance.post<AnswerType<boolean>>(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(id: number) {
        return instance.delete<AnswerType<boolean>>(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => {
                return response.data
            })
    }
}

export const profileAPI = {
    getProfileInfo(id: number | null) {
        return instance.get<ProfileType>(`profile/` + id).then(res => res.data)
    },
    getUserStatus(id: number | null) {
        return instance.get<string>(`profile/status/` + id).then( res => res.data)
    },
    updateUserStatus(status: string) {
        return instance.put<AnswerType<Object>>('profile/status', { status })
    },
    updateUserInfo(data: ProfileType) {
        return instance.put<AnswerType<Object>>('profile',  data)
    },
    updatePhoto(photo: File) {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put<AnswerType<{photos: PhotosType}>>('profile/photo', formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
 }

 type AnswerType<T> = {
     resultCode: number
     messages: Array<string>,
     data: T
 }

 type AuthMe = {
         id: number
         email: string
         login: string
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
        return instance.get<AnswerType<AuthMe>>(`auth/me`).then( (res) => res.data)
    },
    loginAuth(email: string, password: string, rememberMe: boolean, captcha: boolean) {
        return instance.post<AnswerType<{id: number}>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logoutAuth() {
        return instance.delete<AnswerType<Object>>(`auth/login`).then(res => res.data)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{url: string}>(`security/get-captcha-url`).then( res => res.data)
    }
}
