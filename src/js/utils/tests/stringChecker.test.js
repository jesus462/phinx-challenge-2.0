import { stringChecker } from '../stringChecker';

describe('stringChecker function test', () => {
    it('the string is empty', () => {
        // Setup
        const noString = null;
        const expectedResult = null;
        
        // Exercise
        const result = stringChecker(noString);

        // Verify
        expect(result).toBe(expectedResult);
    });
    it('limits the length of the string', () => {
        // Setup
        const string = "Lo ip do si am, co ad el se do ei te in ut la et do ma al.";
        const expectedResult = "Lo ip do si am, co ad el se do...";

        // Exercise
        const result = stringChecker(string);

        // Verify
        expect(result).toBe(expectedResult);
    });
});