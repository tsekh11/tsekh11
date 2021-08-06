import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let MapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const WithAuthRedirect = (Component) => {

    const WithRedirect = (props) => {
        if (!props.isAuth) return <Redirect to={'/login'}/>
        return <Component {...props} />
        }

    return connect(MapStateToProps)(WithRedirect)
}