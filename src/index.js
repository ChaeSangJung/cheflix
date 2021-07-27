import React from "react";
import ReactDOM from "react-dom";
import App from "Components/App";

import { createStore } from "redux";
import { Provider } from 'react-redux';
import rootReducer from "./modules"
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("root")
);
