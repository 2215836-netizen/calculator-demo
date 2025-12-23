export function tokenize(expression) {
    // Remove space
    expression = expression.replace(/\s+/g, '');

    const tokens = [];
    let numberBuffer = '';

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        // Check for digit or decimal point
        if (/[0-9.]/.test(char)) {
            numberBuffer += char;
        } else {
            // If we have a number in buffer, push it
            if (numberBuffer.length > 0) {
                tokens.push(numberBuffer);
                numberBuffer = '';
            }

            // Handle negative numbers
            // Negative if:
            // 1. First character of expression
            // 2. Preceded by an operator or opening parenthesis
            if (char === '-') {
                const isStart = i === 0;
                const prevChar = i > 0 ? expression[i - 1] : null;
                const isAfterOp = prevChar && /[+\-*/(]/.test(prevChar); // Operator or (

                if (isStart || isAfterOp) {
                    numberBuffer += '-';
                    continue; // Skip pushing operator
                }
            }

            // Push operator or parenthesis
            if (/[+\-*/()]/.test(char)) {
                tokens.push(char);
            }
        }
    }

    // Push remaining number
    if (numberBuffer.length > 0) {
        tokens.push(numberBuffer);
    }

    return tokens;
}
