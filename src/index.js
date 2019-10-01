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
        <div className="nav-menu navbar  navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand"><Link className="nav-link" to="/">Saito</Link></span>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/reader">Reader</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/writer">Writer</Link>
                </li>
            </ul>
        </div>
        <Route exact path="/" component={App} />
        <Route path="/reader" component={Reader} />
        <Route path="/writer" component={Writer} />
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
