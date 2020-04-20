import React from "react";
import {newMessageActionCreator, updateMessageActionCreator} from "../../Redux/dialog-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {

    let newMessage = () => {
        props.dispatch(newMessageActionCreator())
    }
    let textMessageChanges = (text) => {
        props.dispatch(updateMessageActionCreator(text))
    }
    return <Dialogs newMessageCreate={newMessage} updateMessageText={textMessageChanges} dialog={props.state.messagesData}/>
}

export default DialogsContainer;