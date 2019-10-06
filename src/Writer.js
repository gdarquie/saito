import React from 'react';
import './Writer.css';
import {Fragment} from "./Fragment";

const API_URL = 'http://localhost:8000';
const SUFFIX_URL = '/fragments';

export class Writer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            fragments: [],
            mode: 'read'
        };
    }

    saveFragment = () => {
        let value = document.getElementById('writerTextArea').value;
        value = JSON.stringify(value);

        let data = '{"content": '+value+'}';
        var httpHeaders = { 'Accept': '*/*','Content-Type' : 'application/json'};
        var myHeaders = new Headers(httpHeaders);

        var myInit = {
            headers: myHeaders,
            method: 'POST',
            cache: 'default',
            body: data
        };

        fetch(API_URL+SUFFIX_URL, myInit)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            throw new Error('Resquest failed');
            }, networkError => console.log(networkError.message))
            .then(jsonResponse => {
                document.getElementById('writerTextArea').value = '';
                this.displayFragments();
            });
    }

    displayFragments = () => {
        var httpHeaders = { 'Accept': '*/*','Content-Type' : 'application/json' };
        var myHeaders = new Headers(httpHeaders);

        var myInit = {
            headers: myHeaders,
            method: 'GET',
            cache: 'default',
        };

        fetch(API_URL + SUFFIX_URL, myInit)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(response => this.setState({
                "fragments": response,
            }))
            .catch(() => console.log("Can’t access " + API_URL + " response. Blocked by browser?"))
        ;
    }

    componentDidMount() {
        this.displayFragments();
    }

    render() {
        const { fragments } = this.state;
        const { mode } = this.state;

        return (
            <div className="container-fluid">
                <header>
                    <h1>La machine à écrire</h1>
                </header>

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <textarea className="form-control" id="writerTextArea" rows="7"></textarea>
                            <button onClick={this.saveFragment} type="button" className="save-btn btn btn-primary">Sauvegarder un nouveau fragment</button>
                        </div>
                    </div>

                    <div className="col-md-8">
                        {fragments.map(fragment =>
                            <Fragment fragment={fragment} mode={mode} key={fragment.code}/>
                        )}
                    </div>

                </div>

            </div>
        )
    }
}
