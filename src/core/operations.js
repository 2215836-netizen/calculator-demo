export function add(a, b) {
    return parseFloat((a + b).toFixed(10));
}

export function subtract(a, b) {
    return parseFloat((a - b).toFixed(10));
}

export function multiply(a, b) {
    return parseFloat((a * b).toFixed(10));
}

export function divide(a, b) {
    if (b === 0) return 'Error';
    return parseFloat((a / b).toFixed(10));
}
