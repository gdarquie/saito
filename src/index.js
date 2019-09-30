import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Reader } from "./Reader";
import { Writer } from "./Writer";

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/reader">Reader</Link>
                </li>
                <li>
                    <Link to="/writer">Writer</Link>
                </li>
            </ul>
            <Route exact path="/" component={App} />
            <Route path="/reader" component={Reader} />
            <Route path="/writer" component={Writer} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
