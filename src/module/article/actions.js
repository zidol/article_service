import { createAction } from 'redux-actions';
import * as articleAPI from '../../api/articleAPI';
import * as types from '../actionTypes'; 
import {push} from 'connected-react-router';
/** 
 * 게시글 등록
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


/** 
 * 게시글 리스트 가져오기
 */ 
 
const getArticleListRequest = createAction(types.GET_ARTICLE_LIST_REQUEST);
const getArticleListSuccess = createAction(types.GET_ARTICLE_LIST_SUCCESS);
export const getArticleListFailed = createAction(types.GET_ARTICLE_LIST_FAILED);
 

export const getArticleList = (lastItem, count) => { 
    return (dispatch, getState) => { 
       dispatch(getArticleListRequest())

       articleAPI.getArticleList(lastItem, count)
        .then((snapshots) => {
            dispatch(getArticleListSuccess({
                list : snapshots.docs,
                isConcat : lastItem ? true : false
            }))
       }).catch((error) => {
            dispatch(getArticleListFailed(error))
       })
    } 
} 

const getArticleRequest  = createAction(types.GET_ARTICLE_REQUEST);
const getArticleSuccess  = createAction(types.GET_ARTICLE_SUCCESS);
const getArticleFailed  = createAction(types.GET_ARTICLE_FAILED);

export const getArticle = (articleId) => { 
    return (dispatch, getState) => { 
       dispatch(getArticleRequest())

       articleAPI.getArticle(articleId)
        .then((doc) => {
            dispatch(getArticleSuccess(doc));
       }).catch((error) => {
           console.log(error)
           dispatch(getArticleFailed(error))
       })
    } 
} 
/** 
 * 댓글 리스트 가져오기
 */ 
 
const getCommentListRequest = createAction(types.GET_COMMENT_LIST_REQUEST);
const getCommentListSuccess = createAction(types.GET_COMMENT_LIST_SUCCESS);
export const getCommentListFailed = createAction(types.GET_COMMENT_LIST_FAILED);
 

export const getCommentList = (articleId, lastItem, count) => { 
    return (dispatch, getState) => { 

       dispatch(getCommentListRequest())

       articleAPI.getCommentList(articleId, lastItem, count)
        .then((snapshots) => {
            dispatch(getCommentListSuccess({
                list : snapshots.docs,
                isConcat : lastItem ? true : false,
            }))
       }).catch((error) => {
           console.log(error);
            dispatch(getCommentListFailed(error))
       })
    } 
} 


/** 
 * 댓글 등록
 */ 
 
const addCommentRequest = createAction(types.ADD_COMMENT_REQUEST);
const addCommentSuccess = createAction(types.ADD_COMMENT_SUCCESS);
export const addCommentFailed = createAction(types.ADD_COMMENT_FAILED);
 
export const addComment = ({articleId, content}) => { 
    return (dispatch, getState) => { 
       dispatch(addCommentRequest());
        const state = getState();
        // state.auth.user = firebaseUser
        if(!state.auth.user) {
            dispatch(addArticleFailed(new Error('user not found')));
            return;
        }
        const userId = state.auth.user.uid;
        const userDisplayName = state.auth.user.displayName;
        const userProfileUrl = state.auth.user.photoURL;

       articleAPI.addComment({
           userId,
           userDisplayName,
           userProfileUrl,
           content,
           articleId
       }).then((doc) => {
            dispatch(addCommentSuccess(doc))
       }).catch((error) => {
           console.log(error);
            dispatch(addCommentFailed(error))
       })
    } 
} 