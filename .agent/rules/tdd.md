---
description: Test-Driven Development (TDD) 규칙
---

# TDD (Test-Driven Development) 규칙

## 개요
UI를 제외한 **순수 코어 로직만** TDD(테스트 주도 개발) 방식으로 구현합니다.
UI 테스트는 자동화하지 않고 수동으로 검증합니다.

## 적용 범위
- ✅ **적용 대상**: 계산 로직, 비즈니스 로직, 유틸리티 함수 (순수 자바스크립트)
- ❌ **제외 대상**: UI 컴포넌트, DOM 조작, 이벤트 핸들러 (수동 테스트로 검증)

## TDD 사이클

### Red-Green-Refactor
1. 🔴 Red: 실패하는 테스트 작성
2. 🟢 Green: 테스트를 통과하는 최소한의 코드 작성
3. 🔵 Refactor: 코드 개선 및 리팩토링

## 구현 절차

### 1. 테스트 먼저 작성
`javascript
// ✅ 올바른 방법: 테스트 먼저
describe('calculate', () => {
    it('should add two numbers', () => {
        expect(calculate(5, 3, '+')).toBe(8);
    });
});
`

### 2. 최소한의 구현
`javascript
// 테스트를 통과하는 최소한의 코드
function calculate(a, b, operator) {
    if (operator === '+') return a + b;
    return 0;
}
`

### 3. 리팩토링
`javascript
// 코드 개선
function calculate(a, b, operator) {
    const operations = {
        '+': (x, y) => x + y, // ...
    };
    return operations[operator]?.(a, b) ?? 'Error';
}
`

## 테스트 구조 (AAA 패턴)
- **Arrange**: 준비 (입력값 정의)
- **Act**: 실행 (함수 호출)
- **Assert**: 검증 (결과 확인)
