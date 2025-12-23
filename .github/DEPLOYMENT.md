# 배포 가이드 (Deployment Guide)

## GitHub Pages 배포 설정

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

---

## 초기 설정

### 1. GitHub 저장소 생성

```bash
# 로컬 Git 초기화
git init

# 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 파일 추가 및 커밋
git add .
git commit -m "Initial commit: Scientific Calculator"

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 2. GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 선택
4. **Source** 섹션에서:
   - Source: `GitHub Actions` 선택
5. 저장

---

## 자동 배포 워크플로우

### 워크플로우 파일
- 경로: `.github/workflows/deploy.yml`
- 트리거: `main` 브랜치에 푸시될 때

### 워크플로우 단계

```mermaid
graph LR
    A[Push to main] --> B[Checkout Code]
    B --> C[Setup Pages]
    C --> D[Build & Validate]
    D --> E[Upload Artifact]
    E --> F[Deploy to Pages]
    F --> G[Live Site]
    
    style A fill:#135bec,color:#fff
    style G fill:#10b981,color:#fff
```

### 빌드 과정

1. **Checkout**: 코드 체크아웃
2. **Setup Pages**: GitHub Pages 설정
3. **Build**: 프로젝트 빌드 (현재는 검증만 수행)
4. **Validate**: 필수 파일 존재 확인
   - `index.html`
   - `app.js`
5. **Upload**: 아티팩트 업로드
6. **Deploy**: GitHub Pages에 배포

---

## 배포 확인

### 배포 상태 확인

1. GitHub 저장소의 **Actions** 탭 방문
2. 최근 워크플로우 실행 확인
3. 각 단계의 로그 확인 가능

### 배포된 사이트 접속

배포 완료 후 다음 URL에서 접속 가능:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

## 수동 배포

워크플로우를 수동으로 실행하려면:

1. GitHub 저장소의 **Actions** 탭 방문
2. 왼쪽에서 **Deploy to GitHub Pages** 워크플로우 선택
3. **Run workflow** 버튼 클릭
4. 브랜치 선택 (기본: main)
5. **Run workflow** 확인

---

## 배포 문제 해결

### 문제 1: 워크플로우가 실행되지 않음

**원인**: GitHub Actions가 비활성화됨  
**해결**:
1. Settings > Actions > General
2. "Allow all actions and reusable workflows" 선택
3. 저장

### 문제 2: 배포 실패 (403 에러)

**원인**: Pages 권한 부족  
**해결**:
1. Settings > Actions > General
2. "Workflow permissions" 섹션에서
3. "Read and write permissions" 선택
4. "Allow GitHub Actions to create and approve pull requests" 체크
5. 저장

### 문제 3: 페이지가 404 에러

**원인**: Pages Source 설정 오류  
**해결**:
1. Settings > Pages
2. Source를 `GitHub Actions`로 변경
3. 워크플로우 재실행

### 문제 4: 빌드 검증 실패

**원인**: 필수 파일 누락  
**해결**:
```bash
# 필수 파일 확인
ls -la index.html app.js

# 파일이 없다면 생성 후 다시 푸시
git add index.html app.js
git commit -m "Add missing files"
git push
```

---

## 로컬 테스트

배포 전 로컬에서 테스트:

### Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

### Node.js HTTP Server
```bash
# http-server 설치 (전역)
npm install -g http-server

# 서버 실행
http-server -p 8000

# 브라우저에서 http://localhost:8000 접속
```

### VS Code Live Server
1. VS Code에서 `index.html` 열기
2. 우클릭 > "Open with Live Server"
3. 자동으로 브라우저 열림

---

## 배포 최적화

### 캐싱 전략

향후 빌드 시간 단축을 위한 캐싱 설정 (필요시 추가):

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 성능 모니터링

배포 후 성능 확인:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

---

## 커스텀 도메인 설정 (선택사항)

### 1. DNS 설정

도메인 제공업체에서 다음 레코드 추가:

```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### 2. GitHub Pages 설정

1. Settings > Pages
2. "Custom domain" 입력
3. "Enforce HTTPS" 체크 (권장)
4. 저장

### 3. 저장소에 CNAME 파일 추가

```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

---

## 환경별 설정

### Production (GitHub Pages)
- URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- 자동 배포
- HTTPS 강제

### Development (로컬)
- URL: `http://localhost:8000`
- 수동 실행
- 핫 리로드 (Live Server 사용 시)

---

## 배포 체크리스트

배포 전 확인사항:

- [ ] 모든 파일이 커밋되었는가?
- [ ] `index.html`이 루트에 있는가?
- [ ] `app.js`가 존재하는가?
- [ ] 로컬에서 정상 작동하는가?
- [ ] 브라우저 콘솔에 에러가 없는가?
- [ ] 모바일에서도 테스트했는가?
- [ ] README.md가 업데이트되었는가?

---

## 롤백 (Rollback)

문제 발생 시 이전 버전으로 롤백:

```bash
# 이전 커밋 확인
git log --oneline

# 특정 커밋으로 롤백
git revert <commit-hash>
git push

# 또는 강제 롤백 (주의!)
git reset --hard <commit-hash>
git push --force
```

---

## 모니터링

### GitHub Actions 상태 배지

README.md에 추가:

```markdown
![Deploy Status](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions/workflows/deploy.yml/badge.svg)
```

### Uptime 모니터링

무료 서비스:
- [UptimeRobot](https://uptimerobot.com/)
- [StatusCake](https://www.statuscake.com/)
- [Pingdom](https://www.pingdom.com/)

---

## 참고 자료

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [actions/deploy-pages](https://github.com/actions/deploy-pages)
- [actions/configure-pages](https://github.com/actions/configure-pages)

---

**최종 업데이트**: 2025-12-23  
**담당자**: Development Team
