import React from "react";
import {newMessageActionCreator, updateMessageActionCreator} from "../../Redux/dialog-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

const DialogsContainer = (props) => {
    if (!props.isAuth) return <Redirect to={'/login'}/>

    return <div>
    <Dialogs {...props} />
    </div>
}

let mapStateToProps = (state) => {
    return {
        dialog: state.messagesData,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        newMessageCreate: () => {dispatch(newMessageActionCreator())},
        updateMessageText: (text) => {dispatch(updateMessageActionCreator(text))}
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(DialogsContainer)
