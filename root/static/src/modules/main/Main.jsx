/* ==================================================
    MAIN
================================================== */

import React from 'react';
import PubSub from 'pubsub-js';

import Greeting from '../../components/Greeting.jsx';
import { toggle } from './actions';
import reducer from './reducer';
import './main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = reducer();

        PubSub.subscribe('Main.actions', (type, action) => { this.setState(reducer(action, this.state)); });
    }

    render () {
        return (
            <div className={ 'test-class' }>
                <Greeting title={ this.state.title } />

                <span>
                    { this.state.isOn.toString() }
                </span>

                <br />
                <br />

                <button type="button" onClick={ () => PubSub.publish('Main.actions', toggle(this.state.isOn)) } >
                    TOGGLE
                </button>
            </div>
        );
    }
}

export default Main;

module.exports = Main;
