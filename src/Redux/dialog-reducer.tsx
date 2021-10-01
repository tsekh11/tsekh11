const UPDATE_MESSAGE = 'app/dialog/UPDATE-MESSAGE'
const ADD_MESSAGE = 'app/dialog/ADD-MESSAGE'

export type DialogType = {
    name: string
    id: string
}

export type MessageType = {
    message: string
}

const initialState = {
    dialogData: [
        {name: 'Misha', id: '1'},
        {name: 'Armen', id: '2'},
        {name: 'Stiven', id: '3'},
        {name: 'Jamal', id: '4'},
        {name: 'Ben', id: '5'}
    ] as Array<DialogType>,
    messageData: [
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hello'}
    ] as Array<MessageType>,
    updateTextArea:''
}

export type DialogInitialStateType = typeof initialState

const dialogReducer = (state = initialState, action: ActionsType): DialogInitialStateType => {
    switch (action.type) {
        case UPDATE_MESSAGE: {
            return {
                ...state,
                updateTextArea: action.newText
            }
        }
        case ADD_MESSAGE: {
            let stateCopy = {...state};
            stateCopy.messageData.push({message: stateCopy.updateTextArea})
            stateCopy.updateTextArea = '';
            return stateCopy
        }
        default:
            return state;
    }
}

type UpdateMessageTextType = {type: typeof UPDATE_MESSAGE, newText: string}
type NewMessageCreateType = {type: typeof ADD_MESSAGE}

type ActionsType = UpdateMessageTextType | NewMessageCreateType

export const updateMessageText = (text: string): UpdateMessageTextType => ({type: UPDATE_MESSAGE, newText: text});
export const newMessageCreate = (): NewMessageCreateType => ({type: ADD_MESSAGE});

export default dialogReducer;