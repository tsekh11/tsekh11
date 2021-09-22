import React from "react";
import {
    DialogType,
    MessageType,
    newMessageCreate,
    updateMessageText
} from "../../Redux/dialog-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";


type MapStateToPropsType = {
    dialogData: Array<DialogType>,
    messageData: Array<MessageType>,
    updateTextArea: string,
    isAuth: boolean | null
}

type MapDispatchToPropsType = {
    newMessageCreate: () => void
    updateMessageText: (text: string) => void
}

type OwnProps = {

}

type DialogsContainer = MapDispatchToPropsType & MapStateToPropsType & OwnProps

const DialogsContainer = (props: DialogsContainer) => {
    if (!props.isAuth) return <Redirect to={'/login'}/>

    return <div>
    <Dialogs {...props} />
    </div>
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogData: state.messagesData.dialogData,
        messageData: state.messagesData.messageData,
        updateTextArea: state.messagesData.updateTextArea,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, {newMessageCreate, updateMessageText}),
    WithAuthRedirect
)(DialogsContainer)
