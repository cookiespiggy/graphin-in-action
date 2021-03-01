import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
// import App from './test/App';
// import App from './test/App4';
// import App from './test/App5';
import App from './demo/Demo2';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();