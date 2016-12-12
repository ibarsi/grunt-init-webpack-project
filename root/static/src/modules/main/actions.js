/* ==================================================
    MAIN
================================================== */

export const TOGGLE = 'TOGGLE';

export function toggle(isOn) {
    return {
        type: TOGGLE,
        payload: {
            isOn
        }
    };
}
