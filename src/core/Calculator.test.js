import { describe, it, expect } from '../../test-utils.js';
import { Calculator } from './Calculator.js';

describe('Calculator Engine', () => {
    let calc;

    // Reset state before each test
    // Note: Since we don't have beforeEach in our simple runner, we'll create new instance or reset manually
    // But our Calculator might be a singleton or class. Let's make it a class for better testability.

    it('should initialize with default state', () => {
        calc = new Calculator();
        expect(calc.getState().currentValue).toBe('0');
        expect(calc.getState().operator).toBe(null);
    });

    it('should handle digit input', () => {
        calc = new Calculator();
        calc.inputDigit('5');
        expect(calc.getState().currentValue).toBe('5');
        calc.inputDigit('3');
        expect(calc.getState().currentValue).toBe('53');
    });

    it('should handle decimal input', () => {
        calc = new Calculator();
        calc.inputDigit('1');
        calc.inputDecimal();
        calc.inputDigit('5');
        expect(calc.getState().currentValue).toBe('1.5');

        // Prevent multiple decimals
        calc.inputDecimal();
        expect(calc.getState().currentValue).toBe('1.5');
    });

    it('should handle operator input', () => {
        calc = new Calculator();
        calc.inputDigit('5');
        calc.handleOperator('+');
        expect(calc.getState().previousValue).toBe('5');
        expect(calc.getState().operator).toBe('+');
        expect(calc.getState().shouldResetDisplay).toBe(true);
    });

    it('should calculate result', () => {
        calc = new Calculator();
        calc.inputDigit('5');
        calc.handleOperator('+');
        calc.inputDigit('3');
        calc.calculate();
        expect(calc.getState().currentValue).toBe('8');
        expect(calc.getState().expression).toBe('5 + 3 =');
    });

    it('should handle scientific function', () => {
        calc = new Calculator();
        calc.inputDigit('30');
        calc.executeScientific('sin'); // Default is Deg
        expect(calc.getState().currentValue).toBeCloseTo(0.5);
    });

    it('should clear validly', () => {
        calc = new Calculator();
        calc.inputDigit('5');
        calc.clear();
        expect(calc.getState().currentValue).toBe('0');
        expect(calc.getState().operator).toBe(null);
    });
});
