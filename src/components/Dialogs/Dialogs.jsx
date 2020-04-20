import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItems/DialogItems";
import Message from "./Messages/Messages";


const Dialogs = (props) => {

    let dialogs = props.dialog.dialogData.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messages = props.dialog.messageData.map(m => <Message message={m.message}/>)

    let newMessage = () => {
        props.newMessageCreate()
    }

    let textMessageChanges = (event) => {
        let text = event.target.value;
        props.updateMessageText(text)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {
                    dialogs
                }
            </div>
            <div className={s.messages}>
                {
                    messages
                }
                <textarea onChange={textMessageChanges} placeholder={'Enter your message'}
                          value={props.dialog.updateTextArea}/>
                <div>
                    <button onClick={newMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;