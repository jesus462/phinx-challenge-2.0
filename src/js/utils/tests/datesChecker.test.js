import { datesChecker } from '../datesChecker';

describe('datesChecker function test', () => {
    it('reformats the date from yy-mm-ddT0000 to: month day, year', () => {
        // Setup
        const inputArray = [{type: "onsaleDate", date:"1993-3-15T0000"}];
        const expectedResult = 'Mar 15, 1993';

        // Exercise
        const result = datesChecker(inputArray);

        // Verify
        expect(result).toBe(expectedResult);
    });
});