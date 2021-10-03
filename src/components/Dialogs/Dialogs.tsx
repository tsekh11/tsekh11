import React, {FC} from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItems/DialogItems";
import Message from "./Messages/Messages";
import {DialogType, MessageType} from "../../Redux/dialog-reducer";

export type DialogPropsType = {
    dialogData: Array<DialogType>
    messageData: Array<MessageType>
    updateTextArea: string
    newMessageCreate: () => void
    updateMessageText: (text: string) => void
}

const Dialogs: FC<DialogPropsType> = ({dialogData, messageData, updateTextArea, newMessageCreate, updateMessageText}) => {

    let dialogs = dialogData.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messages = messageData.map(m => <Message message={m.message}/>)

    let newMessage = () => {
        newMessageCreate()
    }

    let textMessageChanges = (event: any) => {
        updateMessageText(event.target.value)
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
                          value={updateTextArea}/>
                <div>
                    <button onClick={newMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;