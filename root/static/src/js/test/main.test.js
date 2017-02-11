/* ==================================================
    MAIN
================================================== */

import { expect } from 'chai';
import main from '../main';

describe('Main', () => {
    describe('Main Function', () => {
        it('Returns "MAIN APP"', () => {
            const result = main();

            expect(result).to.equal('MAIN APP');
        });
    });
});
