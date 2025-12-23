export function describe(description, callback) {
    console.group(description);
    try {
        callback();
    } catch (e) {
        console.error(e);
    }
    console.groupEnd();
}

export function it(description, callback) {
    try {
        callback();
        console.log(`%c✓ ${description}`, 'color: green');
    } catch (e) {
        console.error(`%c✗ ${description}`, 'color: red');
        console.error(e);
    }
}

export function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            }
        },
        toBeCloseTo(expected, precision = 2) {
            if (typeof actual !== 'number' || typeof expected !== 'number') {
                throw new Error('toBeCloseTo requires numbers');
            }
            const diff = Math.abs(actual - expected);
            const tolerance = Math.pow(10, -precision) / 2;
            if (diff > tolerance) {
                throw new Error(`Expected ${expected} to be close to ${actual} within ${precision} digits`);
            }
        },
        toThrow(errorMsg) {
            try {
                actual();
            } catch (e) {
                if (errorMsg && e.message !== errorMsg) {
                    throw new Error(`Expected error "${errorMsg}", but got "${e.message}"`);
                }
                return;
            }
            throw new Error(`Expected function to throw an error`);
        }
    };
}
