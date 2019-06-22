import { handleActions } from 'redux-actions';
import * as types from '../../actionTypes';

const initialState = {
    isLoading: false,
    error: null,
}

export default handleActions({
    [types.SIGN_IN_WITH_FACEBOOK_REQUEST]: (state) => Object.assign({}, state, { isLoading: true }),
    [types.SIGN_IN_WITH_FACEBOOK_SUCCESS]: (state) => Object.assign({}, state, { isLoading: false }),
    [types.SIGN_IN_WITH_FACEBOOK_FAILED]: (state, action) => Object.assign({}, state, { isLoading: false, error: action.payload })
}, initialState)