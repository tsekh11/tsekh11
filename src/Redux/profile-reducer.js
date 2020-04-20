const initialState = {
        postData: [
            {message: 'Hi', likenum: '33'},
            {message: 'bye', likenum: '13'}
        ],
        newPostText: 'Default text'
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-POST':
            let message = {
                message: state.newPostText,
                likenum: '22'
            }
            state.postData.push(message);
            state.newPostText = '';
            return state;
        case 'UPDATE-POST':
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const newPostActionCreator = () => ({type: 'ADD-POST'});
export const updatePostActionCreator = (text) => ({type: 'UPDATE-POST', newText: text});

export default profileReducer;