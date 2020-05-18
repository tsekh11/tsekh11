const initialState = {
        postData: [
            {message: 'Hi', likenum: '33'},
            {message: 'bye', likenum: '13'}
        ],
        newPostText: 'Default text'
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-POST':{
            let stateCopy = {...state};
            let message = {
                message: stateCopy.newPostText,
                likenum: '22'
            }
            stateCopy.postData = [...state.postData]
            stateCopy.postData.push(message);
            stateCopy.newPostText = '';
            return stateCopy;}
        case 'UPDATE-POST':{
            let stateCopy = {...state};
            stateCopy.newPostText = action.newText;
            return stateCopy;}
        default:
            return state;
    }
}

export const newPostActionCreator = () => ({type: 'ADD-POST'});
export const updatePostActionCreator = (text) => ({type: 'UPDATE-POST', newText: text});

export default profileReducer;