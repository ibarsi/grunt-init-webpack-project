/* ==================================================
   MAIN
================================================== */

import React from 'react';

import Greeting from './greeting/Greeting.jsx';
import './main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Hello, World!'
        };
    }

    render () {
        return (
            <div>
                <Greeting title={ this.state.title } />
            </div>
        );
    }
}

export default Main;
