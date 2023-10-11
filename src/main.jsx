import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "./app/store.js";
import {Provider} from "react-redux";
import {fetchUsers} from "./features/users/usersSlice.js";
import {BrowserRouter} from "react-router-dom";
import {fetchPosts} from "./features/posts/postsSlice.js";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
