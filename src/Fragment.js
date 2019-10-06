import React from 'react';
import './Fragment.css';

const SUFFIX_URL='/fragments';
const API_URL = process.env.REACT_APP_API_URL;

export class Fragment extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fragment: this.props.fragment,
            mode: this.props.mode
        };
    }

    /**
     * update the content of a fragment
     * @param fragment
     */
    editFragment = (fragment) => {
        let value = document.getElementById('input-'+fragment.code).value;
        value = JSON.stringify(value);

        let data = '{"uuid":"'+fragment.uuid+'", "content": '+value+'}';

        var httpHeaders = { 'Accept': '*/*','Content-Type' : 'application/json'};
        var myHeaders = new Headers(httpHeaders);

        var myInit = {
            headers: myHeaders,
            method: 'PUT',
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
                this.setState({
                    'fragment': jsonResponse,
                    'mode' : 'read'
                });
            });
    }

    deleteFragment = (fragment) => {
        //todo : implement method
    }

    /**
     * switch between read mode and edit mode
     * @param fragment
     */
    changeMode = () => {
        if (this.state.mode === 'edit') {
            this.setState({
                'mode' : 'read'
            });
        }
        else {
            this.setState({
                'mode' : 'edit'
            });
        }
    }

    /**
     *
     * @returns {*}
     */
    render() {
        let inputName = 'input-'+this.state.fragment.code;

        if (this.state.mode === 'read') {
            return (
                <article className="fragment-card card" key={this.state.fragment.code}>
                    <header className="fragment-card-menu">
                        <div className="fragment-card-menu-info">
                            <span>code: {this.state.fragment.code} - </span>
                            <span>crée le: {this.state.fragment.createdAt} - </span>
                            <span>dernière modification: {this.state.fragment.updatedAt} - </span>
                            <span>uuid: {this.state.fragment.uuid}</span>
                        </div>
                        <div className="fragment-card-menu-actions">
                            <button className="btn" onClick={this.changeMode.bind(this, this.state.fragment)}>modifier</button>
                            <button className="btn">supprimer</button>
                        </div>
                    </header>

                    <div>
                        <p>{this.state.fragment.content}</p>
                    </div>
                </article>
            )}
        else {
            return (
                <div className="fragment-card card" key={this.state.fragment.code}>
                    <div>
                        <span onClick={this.changeMode.bind(this, this.state.fragment)}>Close</span>
                        <div className="form-group">
                            <textarea className="form-control" id={inputName} rows="7">{this.state.fragment.content}</textarea>
                            <button onClick={this.editFragment.bind(this, this.state.fragment)} type="button" className="save-btn btn btn-primary">Sauvegarder</button>
                        </div>
                    </div>
                </div>
            )}
    }
}