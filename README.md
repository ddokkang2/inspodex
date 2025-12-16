# Design Style Directory

자동 수집/크롤링 없이, **디자인 레퍼런스 “스타일”을 썸네일로 한눈에 탐색**하고 **Pinterest 검색 결과로 바로 이동**할 수 있는 단일 페이지입니다.

## 기능

- **스타일 썸네일 디렉토리**: 과거부터 현재까지 다양한 스타일을 카드(썸네일 + 주석)로 나열
- **스타일 검색**: 한국어/영어/주석/검색어 기반 필터
- **정렬**: `가나다순` / `ABCD순`
- **초성/알파벳 점프**: `ㄱ…ㅎ`, `A…Z` 버튼으로 빠르게 좁혀보기
- **태그 기반 유사 정렬**: 태그 클릭 시 유사 스타일이 위로 정렬(태그 재클릭으로 해제)
- **Pinterest/Google 이미지 연결**: Pinterest 또는 Google 이미지 검색으로 바로 이동

## 실행

브라우저에서 `index.html`을 열면 됩니다.

## SEO & Google Search Console

1. **프로덕션 URL 확정**  
   - `index.html`의 `canonical`, `og:url`, `og:image`, `twitter:image`, `robots.txt`, `sitemap.xml`에 들어간 `https://inspodex.vercel.app/` 값을 실제 도메인으로 바꿉니다.
2. **검색 콘솔 등록**
   1. [Google Search Console](https://search.google.com/search-console/welcome)에 접속 → `도메인` 또는 `URL 접두어` 중 하나 선택  
   2. **URL 접두어** 권장: 프로덕션 URL(예: `https://inspodex.vercel.app/`) 입력 → “소유권 확인” 단계에서  
      - `HTML 파일 업로드` 또는 `HTML meta 태그` 중 원하는 방식으로 인증  
      - meta 태그 방식을 쓰면 `index.html` `<head>`에 제공받은 `<meta name="google-site-verification" ...>`을 추가한 뒤 다시 인증
3. **Sitemap 제출**
   - Search Console 좌측 메뉴 `Sitemaps` → `https://inspodex.vercel.app/sitemap.xml` 입력 후 Submit  
   - 수동 Ping: `https://www.google.com/ping?sitemap=https://inspodex.vercel.app/sitemap.xml`
4. **Favicon/OG 이미지 최종 확인**  
   - 배포 후 `https://inspodex.vercel.app/assets/og-image.svg` 경로가 외부에서 접근 가능한지 테스트  
   - `https://inspodex.vercel.app/robots.txt`, `.../sitemap.xml`도 200 OK인지 확인

## 주의

- 외부 사이트(예: Pinterest)를 스크래핑/저장/재배포하지 않습니다. 이 프로젝트는 “링크 디렉토리” 성격입니다.
- 카드 썸네일은 기본적으로 `assets/thumbs/<style-id>.jpg`(로컬)이며, 없으면 `assets/thumbs/<style-id>.svg`로 폴백합니다.
