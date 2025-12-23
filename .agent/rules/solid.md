---
description: SOLID Principles 규칙
---

# SOLID Principles

## 개요
모든 코드는 SOLID 원칙을 준수하여 유지보수성과 확장성을 확보합니다.

## 5가지 원칙

### 1. SRP (Single Responsibility Principle) - 단일 책임 원칙
- **정의**: 클래스나 함수는 단 하나의 책임만 가져야 합니다.
- **적용**: 계산 로직, UI 업데이트, 이벤트 처리를 분리합니다.
`javascript
// ❌ Bad
function calculateAndShow() { /* 계산하고 화면에 표시 */ }

// ✅ Good
function calculate() { /* 계산만 */ }
function updateDisplay() { /* 표시만 */ }
`

### 2. OCP (Open/Closed Principle) - 개방-폐쇄 원칙
- **정의**: 확장에는 열려 있고, 수정에는 닫혀 있어야 합니다.
- **적용**: 새로운 연산자 추가 시 기존 코드를 수정하지 않고 확장 가능해야 합니다.

### 3. LSP (Liskov Substitution Principle) - 리스코프 치환 원칙
- **정의**: 자식 클래스는 부모 클래스를 대체할 수 있어야 합니다.
- **적용**: 상속 사용 시 부모의 규약을 준수합니다.

### 4. ISP (Interface Segregation Principle) - 인터페이스 분리 원칙
- **정의**: 클라이언트는 사용하지 않는 인터페이스에 의존하지 않아야 합니다.
- **적용**: 거대한 인터페이스보다는 작고 구체적인 인터페이스를 사용합니다.

### 5. DIP (Dependency Inversion Principle) - 의존성 역전 원칙
- **정의**: 고수준 모듈은 저수준 모듈에 의존해서는 안 됩니다. 둘 다 추상화에 의존해야 합니다.
- **적용**: 구체적인 클래스보다는 추상화나 인터페이스에 의존합니다.
