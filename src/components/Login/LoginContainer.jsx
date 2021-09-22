import React from 'react';
import s from './Login.module.css'
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginContainer = (props) => {
    if (props.isAuth !== null && props.isAuth) {
        return <Redirect to={"/profile/8268"}/>
    }
    return <div className={s.wrapper}>
        <h3>Login please</h3>
        <LoginForm {...props} />
    </div>
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
        errorMessage: state.auth.errorMessage,
        isErrorLogin: state.auth.isErrorLogin,
    }
}

export default connect(mapStateToProps, {login})(LoginContainer)