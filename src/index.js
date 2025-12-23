import { Calculator } from './core/Calculator.js';
import { bindEvents } from './ui/eventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Core Engine
    const calculator = new Calculator();

    // 2. Get DOM Elements
    const elements = {
        display: document.getElementById('display'),
        expression: document.getElementById('expression'),
        historyList: document.getElementById('history-list'),
        radDegBtn: document.getElementById('rad-deg'),
        keyPad: document.getElementById('keypad')
    };

    // 3. Bind Events & UI
    bindEvents(calculator, elements);

    console.log('Calculator Initialized (TDD Modular Architecture)');
});
