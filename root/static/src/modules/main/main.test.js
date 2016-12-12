/* ==================================================
    MAIN
================================================== */

// import React from 'react';
// import { mount } from 'enzyme';
// import jsdom from 'mocha-jsdom';
import { expect } from 'chai';

// import Main from './Main.jsx';
import reducer from './reducer';
import { toggle, TOGGLE } from './actions';

describe('Main', () => {
    // TODO: Need to find a way to stub/test my subscribers.
    // describe('<Main/>', () => {
    //     jsdom();

    //     it('isOn label should update as "TOGGLE" button is clicked', (done) => {
    //         const wrapper = mount(<Main/>);
    //         wrapper.setState({ isOn: true });

    //         wrapper.find('button').simulate('click');

    //         expect(wrapper.state('isOn')).to.equal(false);
    //         expect(wrapper.find('span').text()).to.equal('false');
    //         done();
    //     });
    // });

    describe('Reducer', () => {
      it(`Returns correct state for action ${ TOGGLE }`, (done) => {
        let state = reducer();
        let modifiedState = reducer(toggle(state.isOn), state);

        expect(state.isOn).to.equal(!modifiedState.isOn);
        done();
      });
    });
});