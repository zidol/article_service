import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import firebase from 'firebase';
import * as authActions from './module/auth/actions';
import {push} from 'connected-react-router';
/**
 * connected-react-router를 사용하기 위해서 history를 직접 만들어야 한다.
 * history.push기능을 redux에서 바로 사용하기 위해 추가
 */
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

// module/index.js -> 다음과 같이 index.js는 생략 가능
import { configureStore } from './module'

const history = createBrowserHistory();

// Redux store 생성
const store = configureStore(history);

/**
 * Firebase 초기 설정
 */

 // Firebase 환경 변수
var firebaseConfig = {
    apiKey: "AIzaSyCDJ3tkdeTvBuzA6twVk6jt9vHBMeMNwzY",
    authDomain: "clubboard-f4152.firebaseapp.com",
    databaseURL: "https://clubboard-f4152.firebaseio.com",
    projectId: "clubboard-f4152",
    storageBucket: "clubboard-f4152.appspot.com",
    messagingSenderId: "812384309490",
    appId: "1:812384309490:web:2be3665c1e698cd3"
  };
// Firebase 초기화
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user)=> {
    store.dispatch(authActions.updateUser(user));
    // if(user) {
    //     store.dispatch(push('/'));
    // } else {
    //     store.dispatch(push('/sign-in'));
    // }
})
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
