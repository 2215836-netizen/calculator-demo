import { describe, it, expect } from '../../test-utils.js';
import { shuntingYard } from './shuntingYard.js';

describe('Shunting Yard Algorithm', () => {
    it('should convert simple addition', () => {
        // 1 + 2 -> 1 2 +
        const tokens = ['1', '+', '2'];
        const result = shuntingYard(tokens);
        expect(result.length).toBe(3);
        expect(result[0]).toBe('1');
        expect(result[1]).toBe('2');
        expect(result[2]).toBe('+');
    });

    it('should respect precedence (* over +)', () => {
        // 2 + 3 * 4 -> 2 3 4 * +
        const tokens = ['2', '+', '3', '*', '4'];
        const result = shuntingYard(tokens);
        expect(result[3]).toBe('*');
        expect(result[4]).toBe('+');
    });

    it('should handle parentheses', () => {
        // ( 1 + 2 ) * 3 -> 1 2 + 3 *
        const tokens = ['(', '1', '+', '2', ')', '*', '3'];
        const result = shuntingYard(tokens);
        expect(result[0]).toBe('1');
        expect(result[4]).toBe('*');
    });

    it('should handle nested parentheses', () => {
        // ( ( 1 + 2 ) ) -> 1 2 +
        const tokens = ['(', '(', '1', '+', '2', ')', ')'];
        const result = shuntingYard(tokens);
        expect(result.length).toBe(3);
        expect(result[2]).toBe('+');
    });

    it('should handle scientific functions', () => {
        // sin ( 30 ) -> 30 sin
        const tokens = ['sin', '(', '30', ')'];
        const result = shuntingYard(tokens);
        expect(result[0]).toBe('30');
        expect(result[1]).toBe('sin');
    });

    it('should handle mixed operations', () => {
        // 3 + 4 * 2 -> 3 4 2 * +
        const tokens = ['3', '+', '4', '*', '2'];
        const result = shuntingYard(tokens);
        expect(result.join(' ')).toBe('3 4 2 * +');
    });
});
