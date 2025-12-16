# Changelog

## 0.3.21 (2025-12-16)
- Pose 디렉토리: 검색은 Pinterest/Google 이미지로만 동작.
- Posemaniacs: 검색 연동 제거, 참고용 링크 버튼으로만 제공.
- 검색 확장(칩): 포즈 카드 기본 검색어(q) 추가 + 카드 선택 시 검색창 반영 안정화.

## 0.3.22 (2025-12-16)
- Pose 디렉토리 스타일 찾기: A-Z/숫자 점프 대신 동작(poseType)·각도(variant) 퀵필터로 탐색.
- Pose 디렉토리에서 A-Z/숫자 키보드 점프 단축키 비활성화.

## 0.3.23 (2025-12-16)
- Pose 디렉토리: 동작군 6개 추가(총 260개) + 퀵필터 라벨 한글(영문 병기) 적용.

## 0.3.24 (2025-12-16)
- Pose 디렉토리: A-Z/숫자(초성) 점프 UI 완전 숨김 + 디렉토리 전환 시 초성 상태 초기화.

## 0.3.25 (2025-12-16)
- 검색 확장(칩): 카드 미선택/직접 입력 상태에서도 검색창에 즉시 반영되도록 수정.
- Pose 디렉토리: Posemaniacs 버튼을 사이트 선택과 분리된 “바로가기” CTA로 재배치.

## 0.3.26 (2025-12-16)
- Pose 디렉토리: Posemaniacs를 포함한 포즈 전문 추천 링크를 외부검색 하단에 정리(링크 전용).

## 0.3.27 (2025-12-16)
- Character 디렉토리: 검색 사이트를 Pinterest/Google 이미지/Behance/Dribbble 4개로 고정.
- Character 디렉토리: DeviantArt/Sketchfab/ArtStation을 “추천 사이트” 링크로 하단에 추가.

## 0.3.28 (2025-12-16)
- 디렉토리 전환 시 포즈 퀵필터(동작/각도) UI가 남아 보이던 문제 수정 (`[hidden]` 표시 우선 + 상태 초기화).

## 0.3.29 (2025-12-16)
- 검색 확장(칩): 확장 토큰이 계속 누적되던 문제 수정(항상 ‘기본 검색어’를 기준으로 1개 확장만 적용).
- 기본값 복원: 확장 적용 전 기본 검색어로 정확히 되돌리도록 수정.

## 0.3.30 (2025-12-16)
- 외부 검색 UX 단순화: 검색 흐름을 3단계로 시각화하고 안내 문구를 최소화.
- 검색창 기본값: 항상 빈 값으로 시작(카드 클릭 시에만 자동 입력), 카드/직접입력 유도 메시지 추가.

## 0.3.31 (2025-12-16)
- 주간/야간 포함 코드에디터 스타일 컬러 테마 선택 기능 추가(Nord/Dracula/Solarized/High Contrast).

## 0.3.32 (2025-12-16)
- 검색 패널 시인성 개선: 핵심 액션(디렉토리/외부검색/검색 버튼)을 테마별 강조 컬러로 하이라이트.

## 0.3.33 (2025-12-16)
- 태그 표시/저장 개수를 3개로 통일(카드/선택 라벨/내보내기 포함).

## 0.3.34 (2025-12-16)
- 카드에 “샘플 프롬프트 복사” 버튼 추가(태그 위) + 디렉토리/제목/태그 기반 이미지 생성 프롬프트 생성.
- 복사 완료 토스트 메시지 추가.

## 0.3.35 (2025-12-16)
- 샘플 이미지 프롬프트를 “순수 프롬프트”로 재작성(비율/네거티브/파라미터 제거).
- 프롬프트 복사 버튼을 카드 우측 상단 아이콘으로 변경.

## 0.3.36 (2025-12-16)
- 샘플 이미지 프롬프트: 영문 전용으로 재정리(카드 제목/디렉토리에 맞는 시그니처 이미지 묘사만 포함).
- 복사 토스트 메시지 문구 다듬기.

## 0.3.37 (2025-12-16)
- 프롬프트 복사 완료 시 토스트 대신 팝업(모달) 메시지 표시.

## 0.3.38 (2025-12-16)
- 복사 팝업이 표시되지 않던 문제 수정(팝업 DOM을 스크립트 로드 이전에 배치).

## 0.3.39 (2025-12-16)
- 샘플 이미지 프롬프트: 프리셋(시그니처) + 사용자 추가 프롬프트(옵션) 결합 지원.
- `ukiyoe` 카드에 현대적 우키요에 전용 프리셋 프롬프트 적용.

## 0.3.40 (2025-12-16)
- 복사 팝업 메시지에 초간단 사용법 문구 추가(붙여넣기 → 생성).

## 0.3.41 (2025-12-16)
- 외부 검색 패널에서 “(Optional) Extra prompt… / Preset + You” 입력 영역 제거.

## 0.3.3 (2025-12-16)
- Make intent chip lists more production/practical per directory (UI, design systems, ecommerce, lighting diagrams, accessibility palettes, etc).

## 0.3.4 (2025-12-16)
- Fix chip text contrast by removing legacy white-only chip styles.

## 0.3.5 (2025-12-16)
- Replace Random 200 sampling with a true shuffle mode ("카드섞기") that randomizes card order.

## 0.3.6 (2025-12-16)
- Show per-initial card counts in the jump bar.
- Make the two search blocks fully opaque only on hover/focus.

## 0.3.7 (2025-12-16)
- Replace search-block opacity UX with a scroll-based compact mode (auto-collapses the search panel height).

## 0.3.8 (2025-12-16)
- Fix digit initial counts to avoid double-counting (match actual filtered results).

## 0.3.9 (2025-12-16)
- Hide/collapse the search panel while scrolling; show it again when scrolling stops.

## 0.3.10 (2025-12-16)
- Reduce scroll-panel flicker by debouncing scroll detection with delta threshold and a stamp-based timer.

## 0.3.11 (2025-12-16)
- Switch the search panel to "always hidden + summon gesture": use a top handle to open/close an overlay panel.

## 0.3.12 (2025-12-16)
- Keep the search panel open when selecting a card, and hide it again on scroll.

## 0.3.13 (2025-12-16)
- Simplify external search: remove recommended keywords + final query UI, keep only site select + intent chips + manual input.
- Apply intent chips only when a card is selected; add an intent reset button.

## 0.3.14 (2025-12-16)
- Fix external search always opening Pinterest (click handler passed an event as site key).
- Ensure Pinterest/Google Images are always the 1st/2nd site per directory.

## 0.3.15 (2025-12-16)
- Rename intent section to "검색 확장" and reset button to "기본값 복원" with updated helper copy.

## 0.3.16 (2025-12-16)
- Move "검색 확장" options under the external search input.

## 0.3.17 (2025-12-16)
- Make Posemaniacs search distinct by opening Google Images site-search (site:posemaniacs.com ...) instead of the Posemaniacs homepage.

## 0.3.18 (2025-12-16)
- Harden external search routing so non-string event args can't force Pinterest fallback; fixes Posemaniacs(Google) not applying reliably.

## 0.3.19 (2025-12-16)
- Fix Posemaniacs(Google) search by using the active site button dataset and always opening Google Images site-search for posemaniacs.com.

## 0.3.20 (2025-12-16)
- Change Posemaniacs(Google) to open Google web search (not Google Images).

## 0.3.2 (2025-12-15)
- Add intent chips (per directory) and tag-based extra keyword chips in external search.
- Show a final query preview and allow copying it; external search uses the optimized query.
- Improve site-specific boost tokens (Behance/Dribbble/etc).

## 0.3.1 (2025-12-15)
- Redesign the search panel into two distinct modes: in-site style filtering vs external site search.
- Change external search flow: select a site -> select a card (auto-fills keyword) -> click Search/press Enter to run.
- Add Random 200: quickly sample 200 random cards per directory (with clear).

## 0.3.0 (2025-12-15)
- Remove the detail modal + Search Builder UI (cards no longer open a modal).
- Make card click select a style and auto-fill the manual site search input with the style keyword.
- Remove per-card search actions (Pinterest/Google Images/copy); keep searching in the search panel.

## 0.2.9 (2025-12-14)
- Add per-directory manual site search input in the search panel (opens selected site in a new tab).
- Align design directory site list to Pinterest/Google Images/Behance/Dribbble.

## 0.2.8 (2025-12-14)
- Keep A-Z/숫자 필터 active when switching directories.

## 0.2.7 (2025-12-14)
- Remove ERAS/REGIONS UI and filtering.
- Update Overview to auto-generate 3~5 line, title-based explanations.

## 0.2.6 (2025-12-14)
- Remove exclude keyword feature from Search Builder (Quick + Advanced).
- Move `Pinterest` + `Google 이미지` links directly under the final query in the Search Builder.
- Fix Quick mode reset so it reliably reverts the final query (even when the input was focused).

## 0.2.5 (2025-12-14)
- Change `Posemaniacs` to a plain reference link (remove Google site-search behavior).

## 0.2.4 (2025-12-14)
- Rebuild pose directory to single-person, motion-focused entries (remove two-person + prop variations).
- Remove `2인` subject chip from pose Search Builder.

## 0.2.3 (2025-12-14)
- Remove `YouTube` from site switchbar.
- Remove `Line of Action` + `QuickPoses` from pose directory.
- Make `Posemaniacs` open Google site-search (`site:posemaniacs.com ...`).

## 0.2.2 (2025-12-14)
- Add query passing for pose reference sites (Line of Action / QuickPoses / Posemaniacs) via `?q=`.

## 0.2.1 (2025-12-14)
- Add Search Builder dual mode: Quick (beginner) + Advanced (builder).
- Add per-card saved query override (Quick mode Save/Reset).
- Update modal search links live when the query changes.

## 0.2.0 (2025-12-14)
- Add a Search Builder in the detail modal (purpose/subject/detail/exclude).
- Apply site-optimized query tokens per directory (Pinterest/ArtStation/YouTube/etc).
- Use the final query for search links and copy actions (modal + cards).
- Add Notion-ready Markdown export with checklist and links.

## 0.1.0 (2025-12-14)
- Add Notion/clipboard export actions in the detail modal.
