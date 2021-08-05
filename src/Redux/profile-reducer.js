import {usersAPI} from "../api/DAL";

const initialState = {
    postData: [
        {message: 'Hi', likenum: '33'},
        {message: 'bye', likenum: '13'}
    ],
    newPostText: '',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-POST': {
            let stateCopy = {...state};
            let message = {
                message: stateCopy.newPostText,
                likenum: '22'
            }
            stateCopy.postData = [...state.postData]
            stateCopy.postData.push(message);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case 'UPDATE-POST': {
            return {...state, newPostText: action.newText}
        }
        case 'SET-USERS-PROFILE': {
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }
}

export const newPostActionCreator = () => ({type: 'ADD-POST'});
export const updatePostActionCreator = (text) => ({type: 'UPDATE-POST', newText: text});
export const setUsersProfile = (profile) => ({type: 'SET-USERS-PROFILE', profile});

export const getInfo = (userId) => (dispatch) => {
    usersAPI.getProfileInfo(userId).then(response => {
        dispatch(setUsersProfile(response.data))
    })
}

export default profileReducer;