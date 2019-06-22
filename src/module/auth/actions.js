import { createAction } from 'redux-actions'; 
import * as authAPI from '../../api/authAPI'; 
import * as types from '../actionTypes'; 
 
/** 
 * 이메일 로그인 
 */ 
 
const signInWithEmailRequest = createAction(types.SIGN_IN_WITH_EMAIL_REQUEST) 
const signInWithEmailSuccess = createAction(types.SIGN_IN_WITH_EMAIL_SUCCESS) 
const signInWithEmailFailed = createAction(types.SIGN_IN_WITH_EMAIL_FAILED) 
 
export const signInWithEmail = (email, password) => { 
    return (dispatch) => { 
        dispatch(signInWithEmailRequest()); 
        authAPI.signInWithEmail(email, password) 
            .then(() => { 
                dispatch(signInWithEmailSuccess()) 
            }) 
            .catch((error) => { 
                dispatch(signInWithEmailFailed(error)) 
            }) 
    } 
} 
 
