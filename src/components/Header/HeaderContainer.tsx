import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean | null,
    login: null | string
}

type MapDispatchToPropsType = {
    logout: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType


const HeaderContainer = (props: PropsType) => {

    return <Header {...props}/>
}


let MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(MapStateToProps, {logout})(HeaderContainer);