# 🚀 React Admin Template

> React + TypeScript + MobX 기반으로 제작한 확장 가능한 관리자(Admin) 템플릿입니다.
> https://admin-template.vercel.app

실무에서 반복적으로 사용되는 관리자 페이지의 구조를 직접 설계하고 구현한 프로젝트입니다.

단순히 화면을 만드는 것이 아니라

- 인증
- 라우팅
- 전역 상태관리
- API 통신
- 메뉴 관리
- Modal 시스템
- Loading 시스템
- 검색 및 Pagination
- Drag & Drop

등 실제 Admin 프로젝트에서 자주 사용하는 기능들을 하나의 프로젝트 안에서 관리할 수 있도록 구성했습니다.

---


# ✨ Tech Stack

## Front-end

- React
- TypeScript
- Vite

## State Management

- MobX

## Routing

- React Router v6

## Styling

- Styled Components

## HTTP Client

- Axios

## Cookie

- react-cookie

---

# 📁 Project Structure

```

src

├── api
│
├── components
│
├── constants
│
├── pages
│
├── providers
│
├── routes
│
├── store
│
├── styles
│
├── util
│
├── App.tsx
│
└── main.tsx

```

프로젝트는 기능별 역할을 기준으로 폴더를 분리하였으며,

공통 컴포넌트와 비즈니스 로직을 최대한 분리하여 유지보수가 쉽도록 설계했습니다.

---

# 🏗️ Architecture

프로젝트는 아래와 같은 흐름으로 실행됩니다.

```

App
↓
AppProviders
↓
MobX Store 초기화
↓
Router 생성
↓
로그인 여부 확인
↓
Layout 구성
↓
Page Rendering

```
조금 더 자세한 흐름은 아래와 같습니다.

```

App
│
├── AppProviders
│      │
│      ├── CookiesProvider
│      └── StoreProvider
│
├── ThemeProvider
├── GlobalStyle
│
└── RouterProvider
▼
RequireAuth
│
▼
Root Layout
│
├── Header
├── SideNav
├── Outlet(Page)
├── Loading
├── Toast
└── Modal

```

Provider 영역에서 전역 환경을 모두 초기화한 뒤,

Router를 통해 로그인 여부를 검사하고,

인증이 완료되면 공통 Layout 위에서 각각의 페이지가 렌더링되는 구조입니다.

---

# ⚙️ Application Flow

프로젝트가 실행되는 전체 흐름입니다.

```

Application Start
↓
메뉴 정보 조회(API)
↓
MenuStore 초기화
↓
Provider 생성
↓
Router 생성
↓
로그인 여부 확인
↓
Root Layout 생성
↓
Page Rendering

```

실제 서비스에서는 App이 실행되면 가장 먼저 메뉴 API를 호출하여 메뉴 정보를 받아오는 형태를 고려하여 설계했습니다.

현재 프로젝트에서는 API를 대신하여

```

src/constants/index.ts

MENU_LIST

```

데이터를 초기 메뉴 데이터로 사용하고 있습니다.

이를 통해 프로젝트가 시작되는 순간부터 메뉴를 전역 Store에서 관리할 수 있도록 구성했습니다.

이 방식은 메뉴 권한이 변경되거나 API 구조가 변경되더라도 UI를 수정하지 않고 데이터만 변경하면 되도록 하기 위한 구조입니다.

---

# 🚀 App.tsx

프로젝트의 시작점입니다.

App에서는 화면을 그리는 역할보다 **프로젝트 전체 초기화**를 담당합니다.

초기 실행 시 가장 먼저 메뉴 데이터를 준비하고,

Provider를 생성한 뒤

Theme, Router를 차례대로 연결합니다.

App에서 전달된 메뉴 데이터는 이후 MenuStore에서 전역 상태로 관리됩니다.

```

App
↓
메뉴 데이터 준비
↓
AppProviders
↓
Theme
↓
Router
↓
Application Start

```

이 구조를 사용한 이유는

프로젝트의 시작점에서 필요한 초기 데이터를 모두 준비한 뒤

이후에는 어느 컴포넌트에서도 동일한 데이터를 사용할 수 있도록 하기 위함입니다.

# 🔧 Provider Architecture

프로젝트의 모든 전역 기능은 `AppProviders`에서 관리합니다.

React 프로젝트가 커질수록 Provider가 여러 개 생기게 되는데,

각 Provider를 App.tsx에서 직접 관리하면 구조가 복잡해지고 유지보수가 어려워집니다.

이를 방지하기 위해 프로젝트에서 사용하는 Provider들을 하나의 컴포넌트로 묶었습니다.

```
App
 │
 ▼
AppProviders
 │
 ├── CookiesProvider
 └── StoreProvider
```

현재는

- Cookie 관리
- MobX Store 관리

두 가지를 Provider에서 담당하고 있으며,

Provider를 하나로 관리하면 프로젝트 규모가 커져도 App.tsx가 복잡해지지 않는 장점이 있습니다.

---

# 🍪 CookiesProvider

프로젝트의 로그인 인증은 Cookie를 기준으로 동작합니다.

CookiesProvider를 최상위에서 감싸기 때문에

프로젝트 어느 컴포넌트에서든

- 로그인
- 로그아웃
- 토큰 조회

를 자유롭게 사용할 수 있습니다.

로그인 성공 시 Cookie를 저장하고,

Router에서는 해당 Cookie를 기준으로 접근 권한을 확인합니다.

---

# 🧠 MobX Store

프로젝트의 전역 상태는 MobX를 사용하여 관리합니다.

Store는 각각의 역할을 분리하여 관리하였으며,

모든 Store는 하나의 Root Store에서 생성됩니다.

```
Store

├── UserStore
├── MenuStore
├── ModalStore
├── LoadingStore
└── ExampleStore
```

각 Store는 서로 독립적으로 관리되지만,

필요한 경우 Root Store를 통해 다른 Store에 접근할 수 있도록 구성했습니다.

이 구조는 Store 간 의존성을 최소화하면서도 필요한 데이터는 쉽게 공유할 수 있다는 장점이 있습니다.

---

# 📦 Singleton Pattern

프로젝트의 Store는 Singleton Pattern으로 관리됩니다.

```
StoreProvider
↓
Store 생성
↓
전역에서 동일한 Store 사용
```

Store는 최초 한 번만 생성되며,

이후에는 프로젝트 전체에서 동일한 Store 인스턴스를 공유합니다.

따라서

- 페이지 이동
- 컴포넌트 재렌더링

이 발생해도 Store가 새롭게 생성되지 않습니다.

이를 통해

- 상태 유지
- 불필요한 메모리 사용 감소
- 동일한 데이터 공유

가 가능하도록 구성했습니다.

Singleton을 사용한 가장 큰 이유는

프로젝트 전체에서 하나의 상태를 기준으로 관리하기 위함입니다.

---

# 🗂 Store Structure

```
Store

├── UserStore
│
├── MenuStore
│
├── LoadingStore
│
├── ModalStore
│
└── ExampleStore
```

각 Store는 하나의 역할만 담당하도록 설계했습니다.

상태를 기능별로 분리하여

프로젝트 규모가 커져도 유지보수가 쉽도록 구성했습니다.

---

# 📌 MenuStore

프로젝트에서 가장 먼저 초기화되는 Store입니다.

App이 실행되면

가장 먼저 메뉴 데이터를 준비하고,

Provider 생성 시 MenuStore에 전달합니다.

```
Application Start
↓
MENU_LIST (API)
↓
Store 초기화
↓
MenuStore 저장
↓
전역 사용
```

현재 프로젝트에서는

```
src/constants/index.ts
```

의 `MENU_LIST` 데이터를 사용하고 있지만,

실제 서비스에서는 API에서 받아온 메뉴 데이터를 그대로 사용할 수 있도록 설계했습니다.

메뉴를 Store에서 관리하기 때문에

Side Navigation,

Breadcrumb,

권한 체크,

메뉴 활성화 상태 등

모든 화면에서 동일한 데이터를 사용할 수 있습니다.

API 구조가 변경되더라도

Store만 수정하면 되기 때문에 유지보수성이 높습니다.

---

# 👤 UserStore

UserStore는 로그인과 로그아웃을 담당합니다.

현재 프로젝트에서는 예제 형태로 랜덤 토큰을 Cookie에 저장하도록 구성했습니다.

```
Login
↓
Token 생성
↓
Cookie 저장
↓
인증 완료
```

로그아웃 시에는

Cookie를 제거하여 인증 상태를 종료합니다.

실제 프로젝트에서는

JWT,

Access Token,

Refresh Token

등으로 쉽게 확장할 수 있도록 설계했습니다.

---

# ⏳ LoadingStore

LoadingStore는 프로젝트 전체의 Loading 상태를 관리합니다.

특정 페이지가 아닌

모든 API 요청을 하나의 Loading으로 관리하기 위해 제작했습니다.

```
API 요청
↓
Loading Count +1
↓
Loading 표시
↓
API 완료
↓
Loading Count -1
↓
Count == 0
↓
Loading 종료
```

Loading을 Boolean 하나로 관리하지 않고

Count 방식으로 관리한 이유는

동시에 여러 API가 실행되는 경우를 고려했기 때문입니다.

예를 들어

```
API A

API B

API C
```

세 개가 동시에 실행되더라도

모든 요청이 종료될 때까지 Loading이 유지됩니다.

실무에서 자주 사용하는 방식이며,

깜빡이는 Loading 현상을 방지할 수 있습니다.

---

# 🪟 ModalStore

Modal은 배열(Stack) 구조로 관리합니다.

```
Modal Stack

[
 Modal1,
 Modal2,
 Modal3
]
```

Modal을 하나만 관리하는 것이 아니라,

배열에 순차적으로 추가하는 구조를 사용했습니다.

따라서

- Alert
- Confirm
- Register
- Detail

등 여러 Modal을 동시에 띄울 수 있습니다.

또한

가장 마지막 Modal부터 닫히기 때문에

브라우저의 Stack 구조와 동일하게 동작합니다.

이 방식은

복잡한 관리자 페이지에서 매우 유용합니다.

예를 들어

```
등록
↓
상세보기
↓
확인창
```

처럼 Modal 안에서 또 다른 Modal을 호출하는 경우에도

별도의 예외 처리 없이 자연스럽게 동작합니다.

프로젝트에서는

- open()
- close()
- closeAll()

을 제공하여

상황에 맞게 Modal을 제어할 수 있도록 구성했습니다.

---

# 📊 ExampleStore

ExampleStore는 예제 데이터를 관리하는 Store입니다.

검색,

조회,

Drag & Drop 데이터 등을 관리하며,

실제 프로젝트에서는

게시판,

회원관리,

상품관리

등 다양한 비즈니스 데이터를 담당하는 Store가 됩니다.

데이터 조회 후 Store에 저장하면

여러 컴포넌트에서 동일한 데이터를 사용할 수 있습니다.

```
API
↓
ExampleStore
↓
Observable State
↓
Component
```

데이터는 Store에서 한 번만 관리하고,

Observer가 필요한 컴포넌트만 자동으로 다시 렌더링되도록 구성했습니다.

이는 불필요한 Props 전달을 줄이고,

컴포넌트 간 결합도를 낮추는 장점이 있습니다.

---

# 💡 Why MobX?

이 프로젝트에서는 Redux 대신 MobX를 선택했습니다.

선택한 이유는 다음과 같습니다.

- Boilerplate 코드가 적다.
- 객체 지향 방식으로 Store를 구성할 수 있다.
- 상태 변경 코드가 직관적이다.
- 필요한 컴포넌트만 다시 렌더링된다.
- 프로젝트 규모가 커져도 Store를 기능별로 쉽게 분리할 수 있다.

관리자(Admin) 프로젝트는

페이지 수가 많고,

여러 화면에서 동일한 데이터를 사용하는 경우가 많습니다.

이러한 특성을 고려하여

간결하면서도 유지보수가 쉬운 MobX 구조를 적용했습니다.

# 🛣 Routing Architecture

프로젝트는 **React Router v6**를 기반으로 구성하였으며,

로그인 여부에 따라 접근 가능한 화면을 명확하게 분리하였습니다.

```
BrowserRouter

├── Public Route
│
└── Protected Route
```

단순히 URL만 구분하는 것이 아니라

사용자의 인증 상태를 기준으로

접근 가능한 페이지를 분리하도록 설계했습니다.

---

# 🔐 Authentication Flow

프로젝트의 인증 흐름입니다.

```
Application Start
↓
Cookie 확인
↓
Token 존재
↓
Protected Route
↓
Root Layout
↓
Page

----------------------------

Token 없음
↓
Public Route
↓
Login Page
```

모든 페이지는

Router 진입 시 가장 먼저 로그인 여부를 확인합니다.

인증되지 않은 사용자는

로그인 페이지로 이동하며,

인증된 사용자는 관리자 화면으로 진입합니다.

---

# 📁 Route Structure

```
/

├── RequireAuth
│
│── Root
│    │
│    ├── Guide
│    ├── SearchTable
│    ├── Modal
│    ├── Etc
│    └── Detail
│
├── PublicOnly
│
│── LoginRoot
│    │
│    └── Login
│
├── 403
└── 404
```

관리자 페이지와 로그인 페이지를

완전히 분리하여 관리하도록 설계했습니다.

---

# 🔒 RequireAuth

RequireAuth는

로그인한 사용자만 접근 가능한 페이지를 담당합니다.

```
Request
↓
Cookie 확인
↓
인증 성공
↓
Root Layout
↓
Page
```

관리자 페이지는 모두 RequireAuth 내부에서 동작하기 때문에

로그인하지 않은 사용자가

직접 URL을 입력해도 접근할 수 없습니다.

관리자 프로젝트에서 가장 기본이 되는 인증 구조입니다.

---

# 🌍 PublicOnly

PublicOnly는

로그인하지 않은 사용자만 접근 가능한 페이지입니다.

```
Login
↓
Cookie 존재
↓
관리자 페이지 이동

---------------------

Cookie 없음
↓
로그인 페이지
```

로그인된 상태에서

다시 Login 화면으로 접근하는 것을 방지하기 위해 사용했습니다.

이를 통해

불필요한 로그인 화면 노출을 막을 수 있습니다.

---

# 🏠 Root Layout

Root Layout은

로그인 이후의 모든 페이지를 감싸는 공통 Layout입니다.

```
Root

├── Header
├── Side Navigation
├── Outlet
├── Loading
├── Toast
└── Modal
```

관리자 화면에서 공통으로 사용하는

UI를 한 곳에서 관리합니다.

모든 페이지가 동일한 Layout을 사용하기 때문에

페이지마다 Header나 Side Navigation을 다시 작성할 필요가 없습니다.

---

# Root Layout


Root에서는

전역 Navigate와 URL Parameter를 등록하여

Store나 Util에서도

Router 기능을 사용할 수 있도록 구성했습니다.

이를 통해

컴포넌트 외부에서도

페이지 이동이나 URL 정보를 사용할 수 있습니다.

---

# 🔑 LoginRoot

LoginRoot는

로그인 화면에서 사용하는 공통 Layout입니다.

로그인 화면에서는

Header나 Side Navigation이 필요하지 않기 때문에

관리자 화면과 완전히 다른 Layout을 사용합니다.

Layout을 분리하여

각 화면의 역할을 명확하게 구분했습니다.

---

# 🌐 API Layer

프로젝트의 API 통신은

Axios Instance 하나로 관리합니다.

```
Component
↓
Store
↓
Axios Instance
↓
API Server
```

모든 요청은

동일한 Axios Instance를 사용하기 때문에

토큰 처리,

Loading,

Error 처리,

Response 처리

를 한 곳에서 관리할 수 있습니다.

---

# Axios Interceptor

프로젝트의 핵심 중 하나는

Interceptor를 이용한 공통 API 처리입니다.

```
Request
↓
Token 확인
↓
Authorization Header 추가
↓
Loading 시작
↓
API 요청
↓
Response
↓
Loading 종료
↓
Component
```

모든 API 요청은

Interceptor를 거치므로

각 컴포넌트에서

중복 코드를 작성하지 않아도 됩니다.

---

# 🔑 Authorization

로그인된 사용자는

Cookie에 저장된 Token을 자동으로 가져옵니다.

```
Cookie
↓
Token
↓
Axios
↓
Authorization Header
```

Token이 필요한 API는

자동으로 Authorization Header가 추가됩니다.

반대로

로그인이 필요 없는 API는

제외 목록(EXCLUDE_TOKEN_PATH)을 이용하여

Header를 추가하지 않도록 구성했습니다.

이를 통해

API마다 조건문을 작성하지 않아도

공통 로직만으로 처리할 수 있습니다.

---

# ⏳ Loading Flow

모든 API 요청은

LoadingStore와 연결됩니다.

```
Request
↓
Loading Count +1
↓
500ms Delay (변수로 관리)
↓
Loading 표시
↓
Response
↓
Loading Count -1
↓
Count == 0
↓
Loading 종료
```

특정 지정한 초수 Delay를 적용한 이유는

짧은 요청에서도

Loading이 순간적으로 깜빡이는 현상을 방지하기 위해서입니다.

실무에서도 자주 사용하는 방식입니다.

---

# ❗ Error Handling

모든 Error는

Axios에서 공통 처리합니다.

```
Response Error
↓
Status 확인
├── 401
│     ↓
│  Error Page
│
└── Others
      ↓
   Toast 출력
```

401(Unauthorized)이 발생하면

사용자를 인증 오류 페이지로 이동시키도록 구성했습니다.

그 외의 에러는

Toast를 통해 사용자에게 안내합니다.

이러한 방식은

모든 API에서 동일한 Error 정책을 사용할 수 있는 장점이 있습니다.

---

# 📡 API Processing Flow

프로젝트의 전체 API 흐름입니다.

```
Component
↓
Store
↓
Axios Instance
↓
Request Interceptor
↓
Authorization
↓
Loading Start
↓
API
↓
Response
↓
Response Interceptor
↓
Loading End
↓
Store Update
↓
Observer Rendering
```

컴포넌트는

API를 직접 호출하지 않습니다.

Store를 통해 데이터를 요청하고,

Store는 Axios Instance를 이용하여 데이터를 가져옵니다.

응답이 완료되면

Observable 데이터가 변경되고,

Observer 컴포넌트만 자동으로 다시 렌더링됩니다.

이를 통해

비즈니스 로직과 UI를 명확하게 분리하였으며,

유지보수성과 재사용성을 높였습니다.


# 🧩 Core Components

프로젝트는 공통 기능을 컴포넌트 단위로 분리하여 재사용성을 높였습니다.

각 컴포넌트는 하나의 역할만 담당하도록 설계하였으며,

비즈니스 로직은 Store,

UI는 Component,

데이터 처리는 Util로 분리하여 유지보수가 쉽도록 구성했습니다.

---

# 🌳 Recursive Side Navigation

관리자 프로젝트에서 가장 중요한 기능 중 하나는 메뉴입니다.

이 프로젝트에서는 메뉴의 Depth가 고정되지 않도록

**재귀 함수(Recursive Function)** 를 이용하여 Side Navigation을 구현했습니다.

```
MENU

├── Menu 1
│
├── Menu 2
│     │
│     ├── Menu 2-1
│     │
│     └── Menu 2-2
│             │
│             ├── Menu 2-2-1
│             │
│             └── Menu 2-2-2
│
└── Menu 3
```

현재는 MENU_LIST 데이터를 사용하지만,

실제 서비스에서는 API에서 내려오는 메뉴 데이터를 그대로 사용할 수 있도록 설계했습니다.

메뉴 Depth가 늘어나더라도

UI를 수정하지 않고 동일한 컴포넌트로 화면을 구성할 수 있습니다.

---

## Why Recursive?

관리자 프로젝트는

서비스가 커질수록 메뉴 구조도 함께 복잡해집니다.

만약

```
Depth 1

Depth 2

Depth 3

Depth 4
```

를 각각 직접 구현한다면

메뉴 Depth가 추가될 때마다 컴포넌트를 수정해야 합니다.

재귀 구조를 사용하면

Depth의 개수와 관계없이

동일한 로직으로 메뉴를 생성할 수 있습니다.

```
Menu
↓
Children 존재
↓
다시 renderMenu()
↓
Children 존재
↓
다시 renderMenu()
```

따라서

메뉴 구조가 변경되어도

컴포넌트 수정 없이

데이터만 변경하면 화면이 자동으로 구성됩니다.

---



# 🎨 Component Design Philosophy

프로젝트를 구현하면서 가장 중요하게 생각한 것은

**재사용성과 확장성**입니다.

관리자 프로젝트는

비슷한 화면이 반복적으로 생성되는 경우가 많습니다.

따라서

페이지마다 새로운 컴포넌트를 만드는 것이 아니라

공통 컴포넌트를 조합하여

새로운 화면을 만들 수 있도록 설계했습니다.

이를 통해

- 중복 코드 감소
- 유지보수 향상
- UI 일관성 유지
- 기능 확장 용이

를 목표로 프로젝트를 구성했습니다.