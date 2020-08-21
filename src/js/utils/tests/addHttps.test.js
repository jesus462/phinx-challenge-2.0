import { addHttps } from '../addHttps';

describe('addHttps function test', () => {
    it('takes a plain http and adds https', () => {
        // Setup
        const inputHttp = 'http://test.com';
        const expectedResult = 'https://test.com';

        // Exercise
        const result = addHttps(inputHttp);

        // Verify
        expect(result).toBe(expectedResult);
    });
});