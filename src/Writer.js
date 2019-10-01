import React from 'react';
import { MDBInput } from 'mdbreact';

export class Writer extends React.Component{
    render() {
        return (
            <div className="container">
                <h1>La machine à écrire</h1>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea3">C'était à Mégara...</label>
                    <textarea className="form-control" id="exampleFormControlTextarea3" rows="7"></textarea>
                </div>
            </div>
        )
    }
}