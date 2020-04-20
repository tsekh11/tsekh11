import dialogReducer from "./dialog-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profileData: {
            postData: [
                {message: 'Hi', likenum: '33'},
                {message: 'bye', likenum: '13'}
            ],
            newPostText: 'Default text'
        },

        messagesData: {
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
    },

    _callSubscriber() {
        console.log('State is changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        this._state.messagesData = dialogReducer(this._state.messagesData, action);
        this._state.profileData = profileReducer(this._state.profileData, action);
        this._callSubscriber(this._state);
        }
    }





export default store;