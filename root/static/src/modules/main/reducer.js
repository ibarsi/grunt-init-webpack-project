/* ==================================================
    MAIN
================================================== */

import * as actions from './actions';

const initialState = {
    title: 'Hello, World!',
    isOn: false
};

export default function reducer(action, state = initialState) {
    if (!action) { return state; }

    switch (action.type) {
        case actions.TOGGLE:
            return Object.assign({}, state, {
                isOn: !action.payload.isOn
            });
        default:
            return state;
    }
}
