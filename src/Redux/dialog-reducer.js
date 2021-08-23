const UPDATE_MESSAGE = 'app/dialog/UPDATE-MESSAGE'
const ADD_MESSAGE = 'app/dialog/ADD-MESSAGE'

const initialState = {
    dialogData: [
        {name: 'Misha', id: '1'},
        {name: 'Armen', id: '2'},
        {name: 'Stiven', id: '3'},
        {name: 'Jamal', id: '4'},
        {name: 'Ben', id: '5'}
    ],
    messageData: [
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hi'},
        {message: 'Hello'}
    ],
    updateTextArea:''
}

const dialogReducer = (state = initialState, action) => {
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

export const updateMessageActionCreator = (text) => ({type: UPDATE_MESSAGE, newText: text});
export const newMessageActionCreator = () => ({type: ADD_MESSAGE});

export default dialogReducer;