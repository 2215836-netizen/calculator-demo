// 계산기 상태 관리
const state = {
    currentValue: '0',
    previousValue: '',
    operator: null,
    expression: '',
    isRadianMode: true,
    shouldResetDisplay: false,
    history: []
};

// DOM 요소
const displayElement = document.getElementById('display');
const expressionElement = document.getElementById('expression');
const radBtn = document.getElementById('radBtn');
const degBtn = document.getElementById('degBtn');
const historyBtn = document.getElementById('historyBtn');

// 숫자 포맷팅 (천 단위 구분)
function formatNumber(num) {
    if (num === 'Error' || num === 'Infinity' || num === '-Infinity') return num;
    
    const str = num.toString();
    const parts = str.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// 디스플레이 업데이트
function updateDisplay() {
    requestAnimationFrame(() => {
        displayElement.textContent = formatNumber(state.currentValue);
        expressionElement.textContent = state.expression || '0';
    });
}

// 숫자 입력 처리
function handleNumber(digit) {
    if (state.shouldResetDisplay) {
        state.currentValue = digit;
        state.shouldResetDisplay = false;
    } else {
        state.currentValue = state.currentValue === '0' ? digit : state.currentValue + digit;
    }
    updateDisplay();
}

// 소수점 입력 처리
function handleDecimal() {
    if (state.shouldResetDisplay) {
        state.currentValue = '0.';
        state.shouldResetDisplay = false;
    } else if (!state.currentValue.includes('.')) {
        state.currentValue += '.';
    }
    updateDisplay();
}

// 연산자 처리
function handleOperator(op) {
    if (state.operator && !state.shouldResetDisplay) {
        calculate();
    }
    
    state.previousValue = state.currentValue;
    state.operator = op;
    state.expression = `${formatNumber(state.currentValue)} ${op}`;
    state.shouldResetDisplay = true;
    updateDisplay();
}

// 계산 수행
function calculate() {
    if (!state.operator || state.shouldResetDisplay) return;
    
    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.currentValue);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    switch(state.operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }
    
    // 부동소수점 오차 처리
    if (typeof result === 'number') {
        result = parseFloat(result.toFixed(10));
    }
    
    // 히스토리 추가
    addToHistory(`${formatNumber(prev)} ${state.operator} ${formatNumber(current)} = ${formatNumber(result)}`);
    
    state.currentValue = result.toString();
    state.expression = `${formatNumber(prev)} ${state.operator} ${formatNumber(current)}`;
    state.operator = null;
    state.previousValue = '';
    state.shouldResetDisplay = true;
    updateDisplay();
}

// 과학 함수 처리
function applyScientificFunction(func) {
    const num = parseFloat(state.currentValue);
    if (isNaN(num)) return;
    
    let result;
    try {
        switch(func) {
            case 'sin':
                const sinAngle = state.isRadianMode ? num : num * Math.PI / 180;
                result = Math.sin(sinAngle);
                break;
            case 'cos':
                const cosAngle = state.isRadianMode ? num : num * Math.PI / 180;
                result = Math.cos(cosAngle);
                break;
            case 'tan':
                const tanAngle = state.isRadianMode ? num : num * Math.PI / 180;
                result = Math.tan(tanAngle);
                break;
            case 'ln':
                if (num <= 0) {
                    result = 'Error';
                } else {
                    result = Math.log(num);
                }
                break;
            case 'log':
                if (num <= 0) {
                    result = 'Error';
                } else {
                    result = Math.log10(num);
                }
                break;
            case 'sqrt':
                if (num < 0) {
                    result = 'Error';
                } else {
                    result = Math.sqrt(num);
                }
                break;
            case 'square':
                result = num * num;
                break;
            case 'reciprocal':
                if (num === 0) {
                    result = 'Error';
                } else {
                    result = 1 / num;
                }
                break;
            default:
                return;
        }
        
        if (typeof result === 'number') {
            result = parseFloat(result.toFixed(10));
        }
        
        state.expression = `${func}(${formatNumber(num)})`;
        state.currentValue = result.toString();
        state.shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        state.currentValue = 'Error';
        updateDisplay();
    }
}

// 상수 입력
function handleConstant(constant) {
    if (constant === 'pi') {
        state.currentValue = Math.PI.toString();
    } else if (constant === 'e') {
        state.currentValue = Math.E.toString();
    }
    state.shouldResetDisplay = true;
    updateDisplay();
}

// 퍼센트 처리
function handlePercent() {
    const num = parseFloat(state.currentValue);
    if (!isNaN(num)) {
        state.currentValue = (num / 100).toString();
        updateDisplay();
    }
}

// 부호 전환
function toggleSign() {
    const num = parseFloat(state.currentValue);
    if (!isNaN(num)) {
        state.currentValue = (-num).toString();
        updateDisplay();
    }
}

// 백스페이스
function handleBackspace() {
    if (state.currentValue.length > 1) {
        state.currentValue = state.currentValue.slice(0, -1);
    } else {
        state.currentValue = '0';
    }
    updateDisplay();
}

// 전체 삭제
function handleClear() {
    state.currentValue = '0';
    state.previousValue = '';
    state.operator = null;
    state.expression = '';
    state.shouldResetDisplay = false;
    updateDisplay();
}

// 각도 모드 전환
function toggleAngleMode(mode) {
    state.isRadianMode = mode === 'rad';
    
    if (state.isRadianMode) {
        radBtn.className = 'text-slate-900 dark:text-white text-lg font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity';
        degBtn.className = 'text-slate-400 dark:text-slate-500 text-lg font-medium cursor-pointer hover:opacity-80 transition-opacity';
    } else {
        radBtn.className = 'text-slate-400 dark:text-slate-500 text-lg font-medium cursor-pointer hover:opacity-80 transition-opacity';
        degBtn.className = 'text-slate-900 dark:text-white text-lg font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity';
    }
}

// 히스토리 관리
const MAX_HISTORY = 50;

function addToHistory(entry) {
    state.history.unshift(entry);
    if (state.history.length > MAX_HISTORY) {
        state.history.pop();
    }
}

function showHistory() {
    if (state.history.length === 0) {
        alert('계산 기록이 없습니다.');
        return;
    }
    
    const historyText = state.history.slice(0, 10).join('\n');
    alert(`최근 계산 기록:\n\n${historyText}`);
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 버튼 클릭 이벤트 (이벤트 위임)
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;
        
        const action = button.dataset.action;
        const value = button.dataset.value;
        
        switch(action) {
            case 'number':
                handleNumber(value);
                break;
            case 'decimal':
                handleDecimal();
                break;
            case 'add':
                handleOperator('+');
                break;
            case 'subtract':
                handleOperator('-');
                break;
            case 'multiply':
                handleOperator('×');
                break;
            case 'divide':
                handleOperator('÷');
                break;
            case 'equals':
                calculate();
                break;
            case 'clear':
                handleClear();
                break;
            case 'backspace':
                handleBackspace();
                break;
            case 'percent':
                handlePercent();
                break;
            case 'toggle-sign':
                toggleSign();
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'ln':
            case 'log':
            case 'sqrt':
            case 'square':
            case 'reciprocal':
                applyScientificFunction(action);
                break;
            case 'pi':
            case 'e':
                handleConstant(action);
                break;
        }
    });
    
    // 각도 모드 버튼
    radBtn.addEventListener('click', () => toggleAngleMode('rad'));
    degBtn.addEventListener('click', () => toggleAngleMode('deg'));
    
    // 히스토리 버튼
    historyBtn.addEventListener('click', showHistory);
    
    // 키보드 이벤트
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        // 숫자 키
        if (/^[0-9]$/.test(key)) {
            handleNumber(key);
        }
        // 연산자 키
        else if (key === '+') {
            handleOperator('+');
        }
        else if (key === '-') {
            handleOperator('-');
        }
        else if (key === '*') {
            handleOperator('×');
        }
        else if (key === '/') {
            e.preventDefault();
            handleOperator('÷');
        }
        // Enter (=)
        else if (key === 'Enter') {
            e.preventDefault();
            calculate();
        }
        // Backspace
        else if (key === 'Backspace') {
            handleBackspace();
        }
        // Escape (AC)
        else if (key === 'Escape') {
            handleClear();
        }
        // 소수점
        else if (key === '.') {
            handleDecimal();
        }
        // 퍼센트
        else if (key === '%') {
            handlePercent();
        }
    });
});

// 초기 디스플레이 업데이트
updateDisplay();
