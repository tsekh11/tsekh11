import React, {useEffect} from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuth} from "../../Redux/auth-reducer";


const HeaderContainer = (props) => {
    useEffect(() => {
        props.getAuth()
    }, [props.isAuth])
    return <Header {...props}/>
}
let MapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(MapStateToProps, {getAuth})(HeaderContainer);