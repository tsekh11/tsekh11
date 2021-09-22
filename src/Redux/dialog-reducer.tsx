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

const dialogReducer = (state = initialState, action: any): DialogInitialStateType => {
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

export const updateMessageText: (text: string) => ({type: typeof UPDATE_MESSAGE, newText: string})
                                        = (text) => ({type: UPDATE_MESSAGE, newText: text});
export const newMessageCreate: () => ({type: typeof ADD_MESSAGE}) = () => ({type: ADD_MESSAGE});

export default dialogReducer;