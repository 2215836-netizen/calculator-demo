import { add, subtract, multiply, divide } from './operations.js';
import * as scientific from './scientific.js';

export function evaluate(postfixTokens, isDegree = true) {
    const stack = [];

    const isOperator = (token) => ['+', '-', '*', '×', '/', '÷', '^'].includes(token);
    const isFunction = (token) => ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x²', '1/x'].includes(token);

    for (const token of postfixTokens) {
        if (!isNaN(parseFloat(token))) {
            stack.push(parseFloat(token));
        } else if (isOperator(token)) {
            if (stack.length < 2) throw new Error('Invalid expression');
            const b = stack.pop();
            const a = stack.pop();

            let result;
            switch (token) {
                case '+': result = add(a, b); break;
                case '-': result = subtract(a, b); break;
                case '*':
                case '×': result = multiply(a, b); break;
                case '/':
                case '÷': result = divide(a, b); break;
                // Power check needed if supported
                default: throw new Error(`Unknown operator: ${token}`);
            }
            stack.push(result);
        } else if (isFunction(token)) {
            if (stack.length < 1) throw new Error('Invalid expression');
            const a = stack.pop();

            // Map function names to scientific.js exports
            // Assuming scientific.js exports match token names or we map them
            // scientific.js has: sin, cos, tan, log, ln, sqrt, square, reciprocal
            let funcName = token;
            if (token === 'x²') funcName = 'square';
            if (token === '1/x') funcName = 'reciprocal';

            if (scientific[funcName]) {
                const result = scientific[funcName](a, !isDegree); // scientific.js expects isDegree boolean
                stack.push(result);
            } else {
                throw new Error(`Unknown function: ${token}`);
            }
        }
    }

    if (stack.length !== 1) throw new Error('Invalid expression');
    return stack[0];
}
