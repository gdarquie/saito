import React from 'react';
import { Draggable, Droppable } from '@shopify/draggable';

const API_URL = 'http://localhost:8000';
const SUFFIX_URL = '/fragments';

export class Reader extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            fragments: [],
        };
    }

    componentDidMount() {
        var httpHeaders = { 'Accept': '*/*','Content-Type' : 'application/json' };
        var myHeaders = new Headers(httpHeaders);

        var myInit = {
            headers: myHeaders,
            method: 'GET',
            cache: 'default',
        };

        fetch(API_URL + SUFFIX_URL, myInit)
            .then(response => response.json())
            .then(response => this.setState({
                "fragments": response,
            }))
            .catch(() => console.log("Can’t access " + API_URL + " response. Blocked by browser?"))
        ;
    }

    render() {
        const draggable = new Draggable(document.querySelectorAll('.container.ul'), {
            draggable: 'li'
        });

        draggable.on('drag:start', () => console.log('drag:start'));
        draggable.on('drag:move', () => console.log('drag:move'));
        draggable.on('drag:stop', () => console.log('drag:stop'));

        const droppable = new Droppable(document.querySelectorAll('.container'), {
            draggable: '.item',
            dropzone: '.dropzone'
        });

        droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
        droppable.on('droppable:returned', () => console.log('droppable:returned'));

        return (
            <div>
                <h1>Liste de fragments</h1>

                <div className="container">
                    <div className="dropzone draggable-dropzone--occupied">
                        <div className="item">A</div>
                    </div>
                    <div className="dropzone draggable-dropzone--occupied">
                        <div className="item">B</div>
                    </div>
                    <div className="dropzone draggable-dropzone--occupied">
                        <div className="item">C</div>
                    </div>
                </div>

                <div className="container">
                    <div className="dropzone"></div>
                </div>
            </div>
        )
    }
}