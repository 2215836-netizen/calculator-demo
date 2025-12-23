import { describe, it, expect } from '../../test-utils.js';
import { tokenize } from './tokenizer.js';

describe('Tokenizer', () => {
    it('should tokenize simple numbers', () => {
        const result = tokenize('123');
        expect(result.length).toBe(1);
        expect(result[0]).toBe('123');
    });

    it('should tokenize basic operators', () => {
        const result = tokenize('1 + 2');
        expect(result.length).toBe(3);
        expect(result[0]).toBe('1');
        expect(result[1]).toBe('+');
        expect(result[2]).toBe('2');
    });

    it('should handle decimals', () => {
        const result = tokenize('1.5 + 2.3');
        expect(result[0]).toBe('1.5');
        expect(result[2]).toBe('2.3');
    });

    it('should handle parentheses', () => {
        const result = tokenize('( 1 + 2 )');
        expect(result[0]).toBe('(');
        expect(result[4]).toBe(')');
    });

    it('should handle no spaces', () => {
        const result = tokenize('1+2*3');
        expect(result.length).toBe(5);
        expect(result[1]).toBe('+');
        expect(result[3]).toBe('*');
    });

    it('should handle negative numbers at start', () => {
        const result = tokenize('-5 + 3');
        expect(result[0]).toBe('-5');
    });

    it('should handle negative numbers after operator', () => {
        const result = tokenize('5 * -3');
        expect(result[2]).toBe('-3');
    });

    it('should handle implicit multiplication for parens like 2(3)', () => {
        // Optional feature, but good to have. For now just tokenizing.
        // If we want 2(3) -> 2 * 3, tokenizer might split as '2', '(', '3', ')'
        // The ShuntingYard will handle the rules or Tokenizer can insert *.
        // Let's stick to simple tokenizing first.
        const result = tokenize('2(3)');
        expect(result[0]).toBe('2');
        expect(result[1]).toBe('(');
    });
});
