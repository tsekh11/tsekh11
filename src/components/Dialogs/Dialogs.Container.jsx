import React from "react";
import {newMessageActionCreator, updateMessageActionCreator} from "../../Redux/dialog-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


// const DialogsContainer = (props) => {
//
//     let newMessage = () => {
//         props.dispatch(newMessageActionCreator())
//     }
//     let textMessageChanges = (text) => {
//         props.dispatch(updateMessageActionCreator(text))
//     }
//     return <Dialogs newMessageCreate={newMessage} updateMessageText={textMessageChanges} dialog={props.state.messagesData}/>
// }

let mapStateToProps = (state) => {
    return {
        dialog: state.messagesData
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        newMessageCreate: () => {dispatch(newMessageActionCreator())},
        updateMessageText: (text) => {dispatch(updateMessageActionCreator(text))}
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;