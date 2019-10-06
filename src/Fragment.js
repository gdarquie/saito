import React from 'react';
import './Fragment.css';

export class Fragment extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fragment: this.props.fragment,
            mode: this.props.mode
        }
        ;
    }

    editFragment = (fragment) => {
        // faire un switch
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

    render() {
        let inputName = 'input-'+this.state.fragment.code;

        if (this.state.mode === 'read') {
            return (
                <article className="fragment-card card" key={this.state.fragment.code}>
                    <header className="fragment-card-menu">
                        <div className="fragment-card-menu-info">
                            <span>code: {this.state.fragment.code} / </span>
                            <span>crée le: {this.state.fragment.createdAt} / </span>
                            <span>dernière modification: {this.state.fragment.updatedAt}</span>
                        </div>
                        <div className="fragment-card-menu-actions">
                            <button className="btn" onClick={this.editFragment.bind(this, this.state.fragment)}>modifier</button>
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
                        <span onClick={this.editFragment.bind(this, this.state.fragment)}>Close</span>
                        <div className="form-group">
                            <textarea className="form-control" id={inputName} rows="7">{this.state.fragment.content}</textarea>
                            <button onClick={this.saveFragment} type="button" className="save-btn btn btn-primary">Sauvegarder</button>
                        </div>
                    </div>
                </div>
            )}
    }
}