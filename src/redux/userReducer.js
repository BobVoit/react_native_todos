import { userAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA'; 
const SET_iS_SIGN_UP = 'SET_iS_SIGN_UP';
const SET_AVATAR = 'SET_AVATAR';
const SET_NOTES = 'SET_NOTES';
const SET_ONE_NOTE = 'SET_ONE_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const SET_NICKNAME = 'SET_NICKNAME';

let initialState = {
    id: null,
    login: '', 
    nickname: '',
    token: '',
    isAuth: false,
    isSignUp: false,
    avatar: '',
    notes: []
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                id: Number(action.id),
                login: action.login,
                nickname: action.nickname,
                token: action.token,
                isAuth: action.isAuth,
            }
        }
        case SET_iS_SIGN_UP: {
            return {
                ...state,
                isSignUp: action.isSignUp
            }
        }
        case SET_AVATAR: {
            return {
                ...state,
                avatar: action.avatar
            }
        }
        case SET_NOTES: {
            return {
                ...state,
                notes: action.notes
            }
        }
        case SET_ONE_NOTE: {
            return {
                ...state,
                notes: [...state.notes, action.note]
            }
        }
        case DELETE_NOTE: {
            return {
                ...state,
                notes: [...state.notes.filter(note => note.id !== action.noteId)]
            }
        }
        case SET_NICKNAME: {
            return {
                ...state,
                nickname: action.nickname
            }
        }
        default:
            return state;
    }
}

export const setUserData = (id, login, nickname, token, isAuth) => ({
    type: SET_USER_DATA,
    id, login, nickname, token, isAuth
})

export const setSignUp = (isSignUp) => ({
    type: SET_iS_SIGN_UP,
    isSignUp
}) 

export const setAvatar = (avatar) => {
    return {
    type: SET_AVATAR,
    avatar
}}
export const setNotes = (notes) => ({
    type: SET_NOTES,
    notes
})

export const setOneNote = (note) => ({
    type: SET_ONE_NOTE,
    note
})

export const deleteNoteFromState = (noteId) => ({
    type: DELETE_NOTE,
    noteId
})

export const setNickname = (nickname) => ({
    type: SET_NICKNAME,
    nickname
})


export const signUp = (login, password, nickname) => async (dispatch) => {
    let response = await userAPI.signUp(login, password, nickname);
    if (response.data.result === 'ok') {
        dispatch(setSignUp(true));
    }
}

export const getUserByToken = (token) => async (dispatch) => {
    let response = await userAPI.getUserByToken(token);
    const data = response.data.data;
    if (response.data.result === 'ok') {
        dispatch(setUserData(data.id, data.login, data.nickname, data.token, true));
        dispatch(getUserAvatar(data.id));
    }
}

export const login = (login, password) => async (dispatch) => {
    let response = await userAPI.login(login, password);
    console.log(response.data);
    if (response.data.result === 'ok') {
        dispatch(getUserByToken(response.data.data));
    }
}

export const logout = (token) => async (dispatch) => {
    let response = await userAPI.logout(token);
    if (response.data.result === 'ok') {
        dispatch(setUserData(null, null, null, null, false));
        dispatch(setAvatar(null));
    }
}

export const getUserAvatar = (id) => async (dispatch) => {
    let response = await userAPI.getUserAvatar(id);
    if (response.data.result === 'ok') {
        dispatch(setAvatar(response.data.data));
    } else {
        dispatch(setAvatar(null));
    }
} 

export const setUserAvatar = (avatar, id) => async (dispatch) => {
    let response = await userAPI.setUserAvatar(avatar, id);
    if (response.data.result === 'ok') {
        dispatch(getUserAvatar(id));
    }
}

export const addNote = (id, title, message) => async (dispatch) => {
    let response = await userAPI.addNote(id, title, message);
    let data = response.data.data;
    if (response.data.result === 'ok') {
        dispatch(setOneNote(data));
    }
}

export const getAllNotes = (id) => async (dispatch) => {
    let response = await userAPI.getAllNotes(id);
    let data = response.data.data;
    if (response.data.result === 'ok') {
        dispatch(setNotes(data));
    }
}


export const deleteNote = (noteId) => async (dispatch) => {
    let response = await userAPI.deleteNote(noteId);
    if (response.data.result === 'ok') {
        dispatch(deleteNoteFromState(noteId));
    }
}

export const getNickname = (id) => async (dispatch) => {
    let response = await userAPI.getNickname(id);
    if (response.data.result === 'ok') {
        dispatch(setNickname(response.data.data.nickname));
    }
}

export const changeNickname = (id, newNickname) => async (dispatch) => {
    let response = await userAPI.updateNickname(id, newNickname);
    if (response.data.result === 'ok') {
        dispatch(getNickname(id));
    }
}

export const changeAvatar = (id, newAvatar) => async (dispatch) => {
    let response = await userAPI.changeAvatar(newAvatar, id);
    if (response.data.result === 'ok') {
        dispatch(getUserAvatar(id));
    }
}

export const deleteAvatar = (id) => async (dispatch) => {
    let response = await userAPI.deleteAvatar(id);
    if (response.data.result === 'ok') {
        dispatch(setAvatar(null));
    }
}

export default userReducer;