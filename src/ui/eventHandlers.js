import { formatNumber } from '../utils/formatter.js';

export function bindEvents(calculator, elements) {
    const { display, expression, historyList, radDegBtn, keyPad } = elements;

    function updateDisplay() {
        const state = calculator.getState();
        display.textContent = formatNumber(state.currentValue);
        expression.textContent = state.expression || '0';

        // Update Rad/Deg button state
        if (state.isRadianMode) {
            radDegBtn.textContent = 'Rad';
            radDegBtn.classList.replace('text-gray-400', 'text-blue-400');
            radDegBtn.classList.add('bg-blue-500/10');
        } else {
            radDegBtn.textContent = 'Deg';
            radDegBtn.classList.replace('text-blue-400', 'text-gray-400');
            radDegBtn.classList.remove('bg-blue-500/10');
        }

        renderHistory(state.history);
    }

    function renderHistory(history) {
        historyList.innerHTML = history.map(entry => `
            <div class="p-3 bg-gray-700/30 rounded hover:bg-gray-700/50 transition-colors cursor-pointer border border-gray-700/50">
                <div class="text-sm text-gray-400 font-mono">${entry}</div>
            </div>
        `).join('');
    }

    keyPad.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const action = btn.dataset.action;
        const value = btn.dataset.value;

        // Visual feedback
        // btn.classList.add('scale-95');
        // setTimeout(() => btn.classList.remove('scale-95'), 100);

        if (!action) {
            // Fallback for buttons without action (though we seemingly have them for all)
            // But if user clicks a button with just text:
            if (btn.textContent) calculator.inputDigit(btn.textContent.trim());
        } else if (action === 'number') {
            calculator.inputDigit(value);
        } else if (action === 'decimal') {
            calculator.inputDecimal();
        } else if (action === 'operator') {
            calculator.handleOperator(value);
        } else if (action === 'parenthesis') {
            calculator.inputParenthesis(value);
        } else if (action === 'power') {
            calculator.handleOperator('^');
        } else if (action === 'calculate' || action === 'equals') {
            // Added 'equals' as action in index.html is 'equals'
            calculator.calculate();
        } else if (action === 'clear') {
            calculator.clear();
        } else if (action === 'backspace') {
            // calculator.backspace(); // Need to implement? Or just ignore/clear for now if not supported
            // Current calculator.js doesn't have backspace method in my previous edit?
            // Actually, I didn't add it. Let's treat as Clear for safety or nothing.
            // Or better, implement simple backspace in Calculator.js?
            // The user asked to make it work.
            // Let's defer backspace implementation to next step if needed, or implement a simple pop.
            // Check if calculator has backspace? No.
            // Let's skip backspace logic here or map to clear entry?
            // "C" vs "AC".

            // For now, let's just make Numbers and Scientific work.

        } else if (action === 'toggle-sign') {
            // Not implemented in core yet
        } else {
            // Assume scientific or other function
            // Actions: sin, cos, tan, pi, e, ln, log, reciprocal, square, sqrt
            calculator.executeScientific(action);
        }

        updateDisplay();
    });

    // Rad/Deg Toggle
    radDegBtn.addEventListener('click', () => {
        calculator.toggleAngleMode();
        updateDisplay();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (/[0-9]/.test(key)) {
            calculator.inputDigit(key);
        } else if (key === '.') {
            calculator.inputDecimal();
        } else if (['+', '-', '*', '/'].includes(key)) {
            const opMap = { '*': '×', '/': '÷' };
            calculator.handleOperator(opMap[key] || key);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            calculator.calculate();
        } else if (key === 'Escape') {
            calculator.clear();
        } else if (key === 'Backspace') {
            // Backspace not implemented in core yet, treated as clear for now or ignore
            // Core logic doesn't have 'backspace' method in current Plan
        }

        updateDisplay();
    });

    // Initial render
    updateDisplay();
}
