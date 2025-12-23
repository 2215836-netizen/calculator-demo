# 공학용 계산기 (Scientific Calculator)

[![Deploy Status](https://github.com/2215836-netizen/calculator-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/2215836-netizen/calculator-demo/actions/workflows/deploy.yml)

모던하고 직관적인 UI/UX를 갖춘 웹 기반 공학용 계산기입니다.

![Calculator Screenshot](https://via.placeholder.com/800x600?text=Calculator+Screenshot)

## ✨ 주요 기능

### 기본 연산
- ➕ 덧셈
- ➖ 뺄셈
- ✖️ 곱셈
- ➗ 나눗셈
- 📊 퍼센트

### 과학 함수
- 📐 삼각 함수: sin, cos, tan
- 📈 로그 함수: ln (자연로그), log (상용로그)
- 🔢 거듭제곱: x² (제곱), √ (제곱근)
- 🔄 역수: 1/x
- 🎯 수학 상수: π (파이), e (자연상수)

### 사용자 경험
- 🌙 다크 모드 디자인
- ⌨️ 키보드 입력 지원
- 📱 완전 반응형 (모바일/태블릿/데스크톱)
- 🎨 프리미엄 UI/UX
- 📊 천 단위 구분 기호
- 📝 계산 히스토리

## 🚀 빠른 시작

### 온라인에서 사용
배포된 사이트에서 바로 사용하세요:
```
https://2215836-netizen.github.io/calculator-demo/
```

### 로컬에서 실행

#### 방법 1: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

#### 방법 2: Node.js HTTP Server
```bash
# http-server 설치
npm install -g http-server

# 서버 실행
http-server -p 8000
```

#### 방법 3: VS Code Live Server
1. VS Code에서 `index.html` 열기
2. 우클릭 > "Open with Live Server"

## 📖 사용 방법

### 기본 계산
1. 숫자 버튼을 클릭하여 숫자 입력
2. 연산자 버튼 (+, -, ×, ÷) 클릭
3. 다음 숫자 입력
4. `=` 버튼으로 결과 확인

### 과학 함수
1. 숫자 입력
2. 원하는 과학 함수 버튼 클릭 (sin, cos, √ 등)
3. 결과 즉시 표시

### 각도 모드
- **Rad**: 라디안 모드 (기본값)
- **Deg**: 도 모드
- 상단의 Rad/Deg 버튼을 클릭하여 전환

### 키보드 단축키
| 키 | 기능 |
|---|---|
| `0-9` | 숫자 입력 |
| `+` `-` `*` `/` | 연산자 |
| `.` | 소수점 |
| `Enter` | 계산 (=) |
| `Backspace` | 마지막 문자 삭제 |
| `Escape` | 전체 삭제 (AC) |
| `%` | 퍼센트 |

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Tailwind CSS (CDN)
- **JavaScript**: ES6+ (Vanilla JS)
- **폰트**: Space Grotesk (Google Fonts)
- **아이콘**: Material Symbols
- **배포**: GitHub Actions + GitHub Pages

## 📁 프로젝트 구조

```
cal/
├── index.html              # 메인 HTML 파일
├── app.js                  # 계산기 로직
├── README.md               # 프로젝트 문서 (본 파일)
├── PRD.md                  # 제품 요구사항 문서
├── TECH_SPEC.md            # 기술 명세서
├── .gitignore              # Git 제외 파일
├── .github/
│   ├── workflows/
│   │   └── deploy.yml      # GitHub Actions 워크플로우
│   └── DEPLOYMENT.md       # 배포 가이드
└── docs/                   # 참고 자료
```

## 🎨 디자인

### 색상 팔레트
- **Primary**: `#135bec` (파란색)
- **Background**: `#101622` (다크)
- **Surface**: `#1e2430` (다크)
- **Text**: `#ffffff` (흰색)

### 타이포그래피
- **폰트**: Space Grotesk
- **디스플레이**: 48-60px, Bold
- **버튼**: 14-24px, Medium-Bold

## 🧪 테스트

### 브라우저 호환성
- ✅ Chrome (최신 2개 버전)
- ✅ Firefox (최신 2개 버전)
- ✅ Safari (최신 2개 버전)
- ✅ Edge (최신 2개 버전)

### 테스트 케이스
```javascript
// 기본 연산
5 + 3 = 8
10 - 4 = 6
6 × 7 = 42
15 ÷ 3 = 5

// 과학 함수
sin(30°) = 0.5
cos(0°) = 1
√16 = 4
5² = 25
ln(e) = 1
```

## 📚 문서

- [PRD (제품 요구사항 문서)](PRD.md)
- [Tech Spec (기술 명세서)](TECH_SPEC.md)
- [배포 가이드](.github/DEPLOYMENT.md)

## 🚀 배포

GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

### 배포 프로세스
1. `main` 브랜치에 코드 푸시
2. GitHub Actions 자동 실행
3. 빌드 및 검증
4. GitHub Pages에 배포

자세한 내용은 [배포 가이드](.github/DEPLOYMENT.md)를 참조하세요.

## 🤝 기여

기여는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

This project is licensed under the MIT License.

## 👨‍💻 개발자

- **Antigravity AI** - *Initial work*

## 🙏 감사의 말

- [Tailwind CSS](https://tailwindcss.com/)
- [Google Fonts](https://fonts.google.com/)
- [Material Symbols](https://fonts.google.com/icons)

## 📞 연락처

프로젝트 링크: [https://github.com/2215836-netizen/calculator-demo](https://github.com/2215836-netizen/calculator-demo)

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!
