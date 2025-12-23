import { describe, it, expect } from '../../test-utils.js';
import { sin, cos, tan, log, ln, sqrt, square, reciprocal } from './scientific.js';

describe('Scientific Functions', () => {
    describe('Trigonometry', () => {
        it('should calculate sin(30) in degrees', () => {
            expect(sin(30, true)).toBeCloseTo(0.5);
        });
        it('should calculate sin(PI/2) in radians', () => {
            expect(sin(Math.PI / 2, false)).toBeCloseTo(1);
        });
        it('should calculate cos(60) in degrees', () => {
            expect(cos(60, true)).toBeCloseTo(0.5);
        });
        it('should calculate tan(45) in degrees', () => {
            expect(tan(45, true)).toBeCloseTo(1);
        });
    });

    describe('Logarithms', () => {
        it('should calculate ln(e)', () => {
            expect(ln(Math.E)).toBeCloseTo(1);
        });
        it('should calculate log10(100)', () => {
            expect(log(100)).toBeCloseTo(2);
        });
    });

    describe('Power & Root', () => {
        it('should calculate square(5)', () => {
            expect(square(5)).toBe(25);
        });
        it('should calculate sqrt(16)', () => {
            expect(sqrt(16)).toBe(4);
        });
        it('should return error for sqrt of negative', () => {
            expect(sqrt(-1)).toBe('Error');
        });
    });

    describe('Reciprocal', () => {
        it('should calculate 1/x', () => {
            expect(reciprocal(2)).toBeCloseTo(0.5);
        });
        it('should return error for 1/0', () => {
            expect(reciprocal(0)).toBe('Error');
        });
    });
});
