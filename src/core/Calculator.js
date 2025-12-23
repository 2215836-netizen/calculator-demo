import { tokenize } from './tokenizer.js';
import { shuntingYard } from './shuntingYard.js';
import { evaluate } from './evaluator.js';
import * as scientific from './scientific.js';

export class Calculator {
    constructor() {
        this.reset();
    }

    reset() {
        this.state = {
            expression: '',       // The accumulated formula string (e.g., "1 + 2 * ")
            currentValue: '0',    // The current number being entered
            isRadianMode: false,
            shouldResetDisplay: false,
            history: [],
            lastResult: null
        };
    }

    getState() {
        return this.state;
    }

    inputDigit(digit) {
        if (this.state.shouldResetDisplay) {
            this.state.currentValue = digit;
            this.state.expression = '';
            this.state.shouldResetDisplay = false;
        } else {
            this.state.currentValue = this.state.currentValue === '0'
                ? digit
                : this.state.currentValue + digit;
        }
    }

    inputDecimal() {
        if (this.state.shouldResetDisplay) {
            this.state.currentValue = '0.';
            this.state.expression = '';
            this.state.shouldResetDisplay = false;
            return;
        }
        if (!this.state.currentValue.includes('.')) {
            this.state.currentValue += '.';
        }
    }

    handleOperator(op) {
        if (this.state.shouldResetDisplay && this.state.lastResult !== null) {
            // Continue calculation with last result
            this.state.expression = this.state.lastResult + ' ' + op + ' ';
            this.state.shouldResetDisplay = false;
            this.state.currentValue = '0';
            return;
        }

        // If user types 12 +, we append "12 +" to expression
        // We need to handle the case where we just added an operator. replacement?
        // For now, assume simple append.
        this.state.expression += this.state.currentValue + ' ' + op + ' ';
        this.state.currentValue = '0';
    }

    inputParenthesis(paren) {
        // ( 
        if (paren === '(') {
            if (this.state.currentValue !== '0') {
                // 2 ( -> 2 * (
                this.state.expression += this.state.currentValue + ' * ( ';
                this.state.currentValue = '0';
            } else {
                this.state.expression += '( ';
            }
        }
        // )
        else if (paren === ')') {
            this.state.expression += this.state.currentValue + ' ) ';
            this.state.currentValue = '0';
        }
    }

    calculate() {
        // Concatenate the final value to the expression
        // e.g. "1 + 2 * " + "3"
        let fullExpression = this.state.expression + this.state.currentValue;

        // Cleanup: remove trailing operators if any? Tokenizer handles some.

        try {
            const tokens = tokenize(fullExpression);
            const postfix = shuntingYard(tokens);
            // evaluate expects isDegree boolean (false for Radian)
            // But scientific.js functions expect (val, isDegree).
            // Calculator.js state has isRadianMode.
            // isDegree = !isRadianMode
            const result = evaluate(postfix, !this.state.isRadianMode);

            this.addToHistory(`${fullExpression} = ${result}`);

            this.state.currentValue = String(result);
            this.state.lastResult = result;
            this.state.expression = '';
            this.state.shouldResetDisplay = true;
        } catch (e) {
            console.error(e);
            this.state.currentValue = 'Error';
            this.state.shouldResetDisplay = true;
        }
    }

    executeScientific(func) {
        // Immediate execution for scientific functions (UI constraint)
        // sin(30) -> 0.5 replaces 30.
        const value = parseFloat(this.state.currentValue);
        const isDegree = !this.state.isRadianMode;
        let result = 0;

        if (scientific[func]) {
            result = scientific[func](value, isDegree);
        }

        // We treat this like a number input (the result of the function)
        this.state.currentValue = String(result);
        this.state.shouldResetDisplay = true; // Ready for next operator
    }

    addToHistory(entry) {
        this.state.history.unshift(entry);
        if (this.state.history.length > 50) this.state.history.pop();
    }

    clear() {
        this.reset();
    }

    toggleAngleMode() {
        this.state.isRadianMode = !this.state.isRadianMode;
    }
}
