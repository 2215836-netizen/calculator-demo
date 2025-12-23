import { describe, it, expect } from '../../test-utils.js';
import { add, subtract, multiply, divide } from './operations.js';

describe('Basic Operations', () => {
    describe('add', () => {
        it('should add two positive numbers', () => {
            expect(add(5, 3)).toBe(8);
        });

        it('should handle negative numbers', () => {
            expect(add(-2, 3)).toBe(1);
        });

        it('should handle decimals correctly', () => {
            expect(add(0.1, 0.2)).toBeCloseTo(0.3);
        });
    });

    describe('subtract', () => {
        it('should subtract two numbers', () => {
            expect(subtract(10, 4)).toBe(6);
        });
    });

    describe('multiply', () => {
        it('should multiply two numbers', () => {
            expect(multiply(6, 7)).toBe(42);
        });
    });

    describe('divide', () => {
        it('should divide two numbers', () => {
            expect(divide(15, 3)).toBe(5);
        });

        it('should return error when dividing by zero', () => {
            expect(divide(5, 0)).toBe('Error');
        });
    });
});
