# 🚀 React CMS Admin Template

> https://admin-topaz-ten-11.vercel.app/

> React + TypeScript + MobX + Node.js + Supabase 기반으로 확장 가능한 관리자(Admin) 템플릿입니다.
> **포트폴리오용 홈페이지 CMS 관리자 시스템**입니다.

# CMS Admin

> **React + TypeScript 기반의 동적 홈페이지 CMS 관리자 프로젝트**

관리자가 개발자의 코드 수정 없이 홈페이지의 **메뉴 구조, 게시판 콘텐츠, 배너를 직접 구성하고 관리**할 수 있도록 구현한 관리자 시스템입니다.

메뉴와 콘텐츠를 고정된 페이지 단위로 구현하지 않고, 관리자가 생성한 메뉴 데이터를 기준으로 콘텐츠 관리 화면까지 동적으로 확장되도록 설계했습니다.

---

## 주요 구현

### 동적 메뉴 관리
- 1Depth 메뉴 및 하위 게시판 생성 / 수정 / 삭제
- Drag & Drop을 통한 메뉴 순서 변경 및 하위 게시판의 부모 이동
- 게시판별 `list / card / blog` UI 타입 설정
- 최종 Menu Tree를 JSON 형태로 일괄 저장

### 게시판 콘텐츠 관리
- 동적으로 생성된 `menuId`를 기준으로 메뉴와 콘텐츠 연결
- 하나의 콘텐츠 관리 페이지에서 여러 게시판을 동적으로 관리
- 게시판 `subtype`에 따른 List / Card / Blog UI 분기
- 콘텐츠 등록 / 조회 / 수정 / 다중 삭제
- 제목 / 등록 기간 검색 및 Pagination
- Toast UI Editor 기반 WYSIWYG 콘텐츠 작성
- 이미지 업로드 / 미리보기 / 수정

### 배너 관리
- 배너 등록 / 수정 / 다중 삭제
- 이미지 업로드 및 미리보기
- Toggle Switch를 통한 노출 상태 즉시 변경
- Drag & Drop을 통한 배너 순서 변경
- 최대 등록 개수 제한

### 관리자 인증
- Login API를 통한 관리자 인증
- 발급받은 JWT를 Cookie에 저장
- Axios 요청 시 Authorization Header 자동 적용
- 인증이 필요한 등록 / 수정 / 삭제 API 접근 제어

---

## Tech Stack

### Frontend

`React` `TypeScript` `Vite` `MobX` `React Router v6`  
`Styled Components` `Axios` `@hello-pangea/dnd` `Toast UI Editor`

### Backend Integration

`REST API` `JWT` `Cookie` `Multipart FormData`

### Deployment

`Vercel`

---

## Project Position

본 Repository는 전체 CMS 프로젝트 중 **관리자 Front-end**를 담당합니다.

```text
CMS Project

┌─────────────────────────┐
│       CMS Admin         │
│   React + TypeScript    │  ← Current Repository
└────────────┬────────────┘
             │ REST API
             ▼
┌─────────────────────────┐
│        CMS API          │
│    Node.js + Express    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│       Supabase          │
│   Database / Storage    │
└─────────────────────────┘

             ▲
             │ REST API
┌────────────┴────────────┐
│       Homepage          │
│        Next.js          │
└─────────────────────────┘
```

관리자에서 설정한 메뉴, 콘텐츠, 배너 데이터는 API를 통해 저장되며,
Next.js 홈페이지에서는 해당 데이터를 조회하여 실제 사용자 화면을 구성합니다.

> Backend API와 Homepage는 별도의 Repository로 구성했습니다.



## 💡 핵심 설계

### 01. 메뉴와 콘텐츠를 연결하는 동적 CMS 구조

게시판마다 별도의 페이지와 Route를 만드는 방식 대신, 메뉴 생성 시 `nanoid`로 발급한 `menuId`를 기준으로 메뉴와 콘텐츠를 연결했습니다.

```text
관리자에서 게시판 생성
        │
        ▼
     nanoid()
        │
        ▼
      menuId
        │
        ├──────────────┐
        ▼              ▼
    Menu Tree       Contents
                       │
                       ▼
              menuId 기준 CRUD
```

새로운 게시판이 추가되어도 별도의 콘텐츠 관리 페이지를 생성할 필요 없이, 동일한 관리 화면에서 `menuId`에 따라 해당 게시판의 콘텐츠를 조회하고 관리할 수 있습니다.

이를 통해 **메뉴 개수와 Front-end 페이지 구조가 직접적으로 결합되지 않도록 구성했습니다.**

---

### 02. `menuId`와 `subtype`을 이용한 페이지 재사용

콘텐츠 관리 화면은 게시판마다 별도로 구현하지 않고 **하나의 페이지를 재사용**합니다.

현재 선택된 게시판의 정보는 URL Parameter를 통해 전달합니다.

```text
/homepage-setting/content
    ?menuId=xxxx
    &type=board
    &subtype=list
```

각 값은 다음 역할을 담당합니다.

| Parameter | 역할 |
| --- | --- |
| `menuId` | 조회 / 등록할 콘텐츠의 게시판 식별 |
| `type` | 메뉴 유형 식별 |
| `subtype` | List / Card / Blog UI 결정 |

동일한 Content Page에서 `menuId`를 기준으로 데이터를 요청하고, `subtype`에 따라 목록 UI와 표시 개수 등을 변경합니다.

```text
                     Content Page
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
          subtype=list  subtype=card  subtype=blog
              │           │           │
              ▼           ▼           ▼
           List UI      Card UI      Blog UI
```

이 구조를 통해 게시판이 추가되더라도 기존 콘텐츠 관리 로직을 그대로 재사용할 수 있도록 했습니다.

---

### 03. Menu Tree를 하나의 JSON 상태로 관리

메뉴의 생성, 수정, 삭제, 순서 변경마다 각각의 API를 호출하는 대신  
Front-end에서 전체 Menu Tree를 하나의 상태로 관리하고 **최종 결과를 JSON 형태로 저장**하도록 설계했습니다.

```text
메뉴 생성 ─┐
메뉴 수정 ─┤
메뉴 삭제 ─┤
순서 변경 ─┤
부모 이동 ─┘
           │
           ▼
     Front-end Menu Tree
           │
           ▼
       JSON 저장
           │
           ▼
        Menu API
```

메뉴 Drag & Drop에서는 다음 이동을 지원합니다.

- 1Depth 메뉴 간 순서 변경
- 동일 부모 내 하위 게시판 순서 변경
- 하위 게시판을 다른 1Depth 메뉴로 이동

메뉴 구조 자체를 하나의 데이터로 관리하기 때문에 여러 종류의 변경사항을 각각 처리하는 대신 **최종 Tree를 기준으로 동일한 저장 로직을 재사용**할 수 있습니다.

---

## 🔄 전체 데이터 흐름

관리자가 생성한 메뉴는 단순히 Navigation에만 사용되지 않고 콘텐츠 관리 기능까지 연결됩니다.

```text
Menu API
   │
   ▼
MenuStore
   │
   ├───────────────┐
   │               │
   ▼               ▼
Side Navigation   콘텐츠 관리 메뉴
                       │
                       ▼
                    menuId
                       │
                       ▼
                  Content API
```

Application 초기 실행 시 Menu API를 조회하고 `MenuStore`에 저장합니다.

이 데이터를 기반으로 Side Navigation과 콘텐츠 관리 메뉴를 구성하기 때문에,  
**관리자가 새로운 게시판을 생성하면 해당 게시판의 콘텐츠를 관리할 수 있는 구조까지 함께 확장됩니다.**

## ⚙️ 주요 구현

### 📝 Content Management

동적으로 생성된 `menuId`를 기준으로 게시판별 콘텐츠를 관리하며, 등록부터 검색·수정·삭제까지 하나의 관리 흐름으로 구성했습니다.

- 제목 및 등록 기간(`startDate ~ endDate`) 검색
- Pagination 및 검색 조건 URL Parameter 연동
- Toast UI Editor 기반 WYSIWYG 콘텐츠 작성
- `FormData`를 이용한 본문 + 이미지 동시 업로드
- 수정 시 기존 이미지 유지 / 제거 / 신규 이미지 추가
- Checkbox 기반 단일·다중 삭제
- `subtype`에 따른 List / Card / Blog 목록 UI 분기

```text
menuId + Search Params
          │
          ▼
     Content Store
          │
          ▼
      Content API
          │
          ▼
   list / card / blog
```

게시판마다 별도의 CRUD 페이지를 구현하지 않고 `menuId`와 `subtype`을 기준으로 동일한 관리 로직과 페이지를 재사용했습니다.

---

### 🖼 Banner Management

홈페이지 배너의 데이터뿐만 아니라 **노출 여부와 노출 순서까지 관리자에서 직접 제어**할 수 있도록 구현했습니다.

- 배너 등록 / 수정 / 다중 삭제
- 기존 이미지 미리보기 및 이미지 교체
- POST / PATCH에서 동일한 Form 및 Store 로직 재사용
- Toggle Switch 변경 즉시 `active` 상태 PATCH
- Drag & Drop으로 배너 순서 변경
- Drag 완료 시 `id + sortOrder` 배열을 API에 전달
- 일반 정보 수정과 순서 변경을 분리하여 기존 `sortOrder` 유지
- 최대 5개 등록 제한

```text
               Banner List
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
  Toggle Switch            Drag & Drop
        │                       │
   active PATCH           sortOrder PATCH
        │                       │
        └───────────┬───────────┘
                    ▼
                 Homepage
```

---

### 🔐 API Authentication

로그인 성공 시 API에서 발급받은 JWT를 Cookie에 저장하고, Axios 요청 시 인증 정보가 자동으로 포함되도록 구성했습니다.

```text
Login
  ↓
JWT 발급
  ↓
Cookie 저장
  ↓
Axios Request
  ↓
Authorization Header
  ↓
Protected API
```

등록 / 수정 / 삭제와 같은 관리자 기능은 인증된 요청을 통해서만 수행되도록 Backend API와 연동했습니다.

---

### ♻️ 상태 관리와 공통화

페이지별 API 요청과 데이터 상태는 MobX Store에서 관리하고, Component는 사용자 이벤트와 화면 렌더링에 집중하도록 역할을 분리했습니다.

```text
Component
    ↓
MobX Store
    ↓
Axios
    ↓
REST API
```

또한 반복되는 UI와 동작을 공통화하여 재사용했습니다.

`Modal` · `Input` · `Button` · `Pagination` · `FormTable` · `Loading` · `Toast`

특히 Modal은 Store에서 상태를 관리하여 등록 / 수정 / 확인 / 이미지 미리보기 등 여러 화면에서 동일한 구조를 재사용할 수 있도록 구성했습니다.