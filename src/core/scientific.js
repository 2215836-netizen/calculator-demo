export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function sin(val, isDegree) {
    const angle = isDegree ? toRadians(val) : val;
    return parseFloat(Math.sin(angle).toFixed(10));
}

export function cos(val, isDegree) {
    const angle = isDegree ? toRadians(val) : val;
    return parseFloat(Math.cos(angle).toFixed(10));
}

export function tan(val, isDegree) {
    const angle = isDegree ? toRadians(val) : val;
    return parseFloat(Math.tan(angle).toFixed(10));
}

export function log(val) {
    return parseFloat(Math.log10(val).toFixed(10));
}

export function ln(val) {
    return parseFloat(Math.log(val).toFixed(10));
}

export function sqrt(val) {
    if (val < 0) return 'Error';
    return parseFloat(Math.sqrt(val).toFixed(10));
}

export function square(val) {
    return parseFloat(Math.pow(val, 2).toFixed(10));
}

export function reciprocal(val) {
    if (val === 0) return 'Error';
    return parseFloat((1 / val).toFixed(10));
}
