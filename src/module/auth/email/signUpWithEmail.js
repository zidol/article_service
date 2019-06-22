import { handleActions } from 'redux-actions';
import * as types from '../../actionTypes';

const initialState = {
    isLoading: false,
    error: null,
}

export default handleActions({
    [types.SIGN_UP_WITH_EMAIL_REQUEST]: (state) => Object.assign({}, state, { isLaoding: true }),
    [types.SIGN_UP_WITH_EMAIL_SUCCESS]: (state) => Object.assign({}, state, { isLaoding: false }),
    [types.SIGN_UP_WITH_EMAIL_FAILED]: (state, action) => Object.assign({}, state, { isLaoding: false, error: action.payload })
}, initialState)