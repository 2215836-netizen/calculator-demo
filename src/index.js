import { Calculator } from './core/Calculator.js';
import { bindEvents } from './ui/eventHandlers.js';

// EMERGENCY DEBUGGING: Global Error Handler
window.onerror = function (msg, url, lineNo, columnNo, error) {
    alert('Error: ' + msg + '\nLine: ' + lineNo);
    return false;
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        // 1. Initialize Core Engine
        const calculator = new Calculator();

        // 2. Get DOM Elements
        const elements = {
            display: document.getElementById('display'),
            expression: document.getElementById('expression'),
            historyList: document.getElementById('history-list'),
            radDegBtn: document.getElementById('rad-deg'),
            radDegBtn: document.getElementById('rad-deg'),
            // Robust selection: ID > Backup by class structure > Body fallback
            keyPad: document.getElementById('keypad') || document.querySelector('.grid')?.parentElement || document.body
        };

        if (!elements.keyPad) {
            console.error('Critical: Keypad element not found!');
            return;
        }

        // 3. Bind Events & UI
        bindEvents(calculator, elements);

        console.log('Calculator Initialized (TDD Modular Architecture)');
        // alert('Calculator System Loaded!'); // Uncomment if needed to verify script load
    } catch (e) {
        alert('Init Error: ' + e.message);
        console.error(e);
    }
});
