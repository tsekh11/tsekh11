import React from 'react';
import s from './Login.module.css'
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = {
    captchaUrl: null | string,
    errorMessage: string,
    isErrorLogin: boolean,
    isAuth: boolean | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: boolean) => void
}

type OwnProps = {

}

export type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType & OwnProps

const LoginContainer = (props: LoginPropsType) => {
    if (props.isAuth !== null && props.isAuth) {
        return <Redirect to={"/profile/8268"}/>
    }
    return <div className={s.wrapper}>
        <h3>Login please</h3>
        <LoginForm {...props} />
    </div>
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
        errorMessage: state.auth.errorMessage,
        isErrorLogin: state.auth.isErrorLogin,
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, {login})(LoginContainer)