import { add, subtract, multiply, divide } from './operations.js';
import * as scientific from './scientific.js';

export class Calculator {
    constructor() {
        this.reset();
    }

    reset() {
        this.state = {
            currentValue: '0',
            previousValue: '',
            operator: null,
            expression: '',
            isRadianMode: false,
            shouldResetDisplay: false,
            history: []
        };
    }

    getState() {
        return this.state;
    }

    inputDigit(digit) {
        if (this.state.shouldResetDisplay) {
            this.state.currentValue = digit;
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
            this.state.shouldResetDisplay = false;
        } else if (!this.state.currentValue.includes('.')) {
            this.state.currentValue += '.';
        }
    }

    handleOperator(nextOperator) {
        const { currentValue, operator, previousValue } = this.state;

        if (operator && this.state.shouldResetDisplay) {
            this.state.operator = nextOperator;
            return;
        }

        if (previousValue === '') {
            this.state.previousValue = currentValue;
        } else if (operator) {
            const result = this.performCalculation(operator, previousValue, currentValue);
            this.state.currentValue = String(result);
            this.state.previousValue = String(result);
        }

        this.state.operator = nextOperator;
        this.state.shouldResetDisplay = true;
    }

    calculate() {
        const { currentValue, previousValue, operator } = this.state;
        if (!operator || !previousValue) return;

        const result = this.performCalculation(operator, previousValue, currentValue);

        this.addToHistory(`${previousValue} ${operator} ${currentValue} = ${result}`);

        this.state.expression = `${previousValue} ${operator} ${currentValue} =`;
        this.state.currentValue = String(result);
        this.state.previousValue = '';
        this.state.operator = null;
        this.state.shouldResetDisplay = true;
    }

    performCalculation(op, a, b) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        switch (op) {
            case '+': return add(numA, numB);
            case '-': return subtract(numA, numB);
            case '×': return multiply(numA, numB);
            case '÷': return divide(numA, numB);
            default: return b;
        }
    }

    executeScientific(func) {
        const value = parseFloat(this.state.currentValue);
        const isDegree = !this.state.isRadianMode;
        let result = 0;

        if (scientific[func]) {
            result = scientific[func](value, isDegree);
        }

        this.addToHistory(`${func}(${value}) = ${result}`);
        this.state.currentValue = String(result);
        this.state.shouldResetDisplay = true;
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
