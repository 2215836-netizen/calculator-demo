export function shuntingYard(tokens) {
    const outputQueue = [];
    const operatorStack = [];

    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '×': 2,
        '/': 2,
        '÷': 2,
        '^': 3
    };

    const isOperator = (token) => ['+', '-', '*', '×', '/', '÷', '^'].includes(token);
    const isFunction = (token) => ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x²', '1/x'].includes(token);

    for (const token of tokens) {
        if (!isNaN(parseFloat(token))) {
            outputQueue.push(token);
        } else if (isFunction(token)) {
            operatorStack.push(token);
        } else if (isOperator(token)) {
            while (
                operatorStack.length > 0 &&
                operatorStack[operatorStack.length - 1] !== '(' &&
                (
                    isFunction(operatorStack[operatorStack.length - 1]) ||
                    (precedence[operatorStack[operatorStack.length - 1]] >= precedence[token])
                )
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            if (operatorStack.length === 0) {
                // Mismatched parentheses
                throw new Error('Mismatched parentheses');
            }
            operatorStack.pop(); // Pop '('

            // If top of stack is function, pop it to queue
            if (operatorStack.length > 0 && isFunction(operatorStack[operatorStack.length - 1])) {
                outputQueue.push(operatorStack.pop());
            }
        }
    }

    while (operatorStack.length > 0) {
        if (operatorStack[operatorStack.length - 1] === '(') {
            throw new Error('Mismatched parentheses');
        }
        outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
}
