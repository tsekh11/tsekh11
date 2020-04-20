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
        case 'UPDATE-MESSAGE':
                state.updateTextArea = action.newText;
                return state;
        case 'ADD-MESSAGE':
            let message = {
                message: state.updateTextArea,
            }
            state.messageData.push(message)
            state.updateTextArea = '';
            return state;
        default:
            return state;
    }
}

export const updateMessageActionCreator = (text) => ({type: 'UPDATE-MESSAGE', newText: text});
export const newMessageActionCreator = () => ({type: 'ADD-MESSAGE'});

export default dialogReducer;