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
            // Number input
            calculator.inputDigit(btn.textContent.trim());
        } else if (action === 'decimal') {
            calculator.inputDecimal();
        } else if (action === 'operator') {
            calculator.handleOperator(value);
        } else if (action === 'parenthesis') {
            calculator.inputParenthesis(value);
        } else if (action === 'power') {
            calculator.handleOperator('^');
        } else if (action === 'calculate') {
            calculator.calculate();
        } else if (action === 'clear') {
            calculator.clear();
        } else if (action === 'scientific') {
            calculator.executeScientific(value);
        } else if (action === 'toggle-scientific') {
            // Mobile toggle not implemented in core yet, handled by CSS usually
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
