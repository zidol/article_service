import { createAction } from 'redux-actions';
import * as articleAPI from '../../api/articleAPI';
import * as types from '../actionTypes'; 
import {push} from 'connected-react-router';
/** 
 * 게시글 등ㅇ록
 */ 
 
const addArticleRequest = createAction(types.ADD_ARTICLE_REQUEST);
const addArticleSuccess = createAction(types.ADD_ARTICLE_SUCCESS);
export const addArticleFailed = createAction(types.ADD_ARTICLE_FAILED);
 
export const addArticle = ({file, content}) => { 
    return (dispatch, getState) => { 
       dispatch(addArticleRequest());
        const state = getState();
        // state.auth.user = firebaseUser
        if(!state.auth.user) {
            dispatch(addArticleFailed(new Error('user not found')));
            return;
        }
        const userId = state.auth.user.uid;
        const userDisplayName = state.auth.user.displayName;
        const userProfileUrl = state.auth.user.photoURL;

       articleAPI.addArticle({
           file,
           content,
           userId,
           userDisplayName,
           userProfileUrl
       }).then(() => {
            dispatch(addArticleSuccess())
            dispatch(push('/'))
       }).catch((error) => {
            dispatch(addArticleFailed(error))
       })
    } 
} 
 