import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// module/index.js -> 다음과 같이 index.js는 생략 가능
import { configureStore } from './module'

// Redux store 생성
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
