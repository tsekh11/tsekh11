import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../Redux/auth-reducer";


const HeaderContainer = (props) => {

    return <Header {...props}/>
}


let MapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(MapStateToProps, {logout})(HeaderContainer);