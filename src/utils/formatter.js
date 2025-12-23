export function formatNumber(numStr) {
    if (!numStr) return '0';
    if (numStr === 'Error') return 'Error';

    // Handle scientific notation
    if (numStr.includes('e')) return numStr;

    const parts = numStr.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];

    // Add thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
}
