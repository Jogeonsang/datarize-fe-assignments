# 과제 구현 내용

## 프로젝트 소개

이 프로젝트는 Datarize의 프론트엔드 과제로, 총 3가지 기능을 제공합니다.

- 가격대별 구매 빈도 차트
- 가장 많이 구매한 고객 목록 및 검색 기능
- 고잭 ID 기반 상세 기능

## 폴더 구조

### API

API는 언제든 재사용이 가능하다고 판단해 따로 폴더를 생성해 관리했습니다.
더 나아가서 모노레포 구조를 사용했을 때 api를 따로 분리하면서 각 서비스에서 해당되는 api를 쉽게 사용할 수 있다 생각했습니다.

### components

재사용 가능한 컴포넌트가 포함됩니다. 기본적인 UI 구성요소도 포함될 수 있고, `calendar`, `bottom-sheet`, `popover` 와 같은 React 컴포넌트가 포함될 수 있습니다.

### hooks

커스텀 React 훅과 `react-query`가 포함됩니다. 반복되는 로직을 추출하여 재사용 가능하게 합니다.

앞서 `api` 폴더를 나눠서 관리하고있는 부분을 불러와 실제 사용하는 코드들을 작성합니다.

현재는 서비스 규모가 작아 query폴더에 직접적으로 관리하고있지만 이후 서비스가 커졌을 때
`query > service or feature name > queryName` 으로 관리할 수 있습니다.

### lib

서비스에서 사용되는 config 함수들이 포함됩니다. 예를 들어, `react-query`, `axios`, `styles`와 같은 서비스 내부에서 환경을 구성하는데 사용되는 코드들을 관리할 수 있습니다.

## 과제에서 집중한 부분

해당 프로젝트는 유저 반응에 따라서 기획 및 개발 방향성이 언제든 변할 수 있다는 점에 집중했습니다.

features folder 구조를 사용하며 page와 1:1 관계를 가질 수 있도록 설계했습니다.

component와는 사뭇 다른 느낌의 폴더 구조입니다.

components는 "재사용이 가능한" 이라는 점에 집중하고있는 반면에 features는 "기능"과 "관심사"에 집중하고있습니다.

기능을 구현하기 위해서 components와 그렇지 않은 1회성으로 사용할 코드들이 필요합니다.
이 1회성으로 사용하는 코드들을 모아두는 공간이라고 이해해주시면 좋을 것 같습니다.

또한 관심사끼리 묶어 추후 유지보수하는 개발자 입장에서 하나의 기능만을 관리하기 때문에 조금 더 유지보수에 유연하게 대응할 수 있다고 판단했습니다.

`폴더 구조에 대한 Article`

- [feature folder관련 아티클](https://profy.dev/article/react-folder-structure#exit-group-by-features)
- [feature foler 관련 본인이 작성했던 글](https://www.marcus-log.dev/posts/future-oriented-frontend-architecture)

## 라이브러리 선택 및 사용 근거

### @tanstack/react-query

`@tanstack/react-query`는 api fetching에 사용되었습니다.

- 캐싱된 데이터를 사용하여 사용자 경험을 향상시킵니다.
- 이미 자리잡은 생태계

### Zod

`zod`는 api를 통해 가져오는 데이터의 타입을 검증하기 위해 사용되었습니다.

프론트엔드에서 데이터 검증은 가장 중요한 과제라고 생각합니다.
신뢰할 수 없는 데이터를 처리하거나, 예상치 못한 형식의 데이터가 들어오면 서비스가 오작동할 수 있습니다.
물론 에러 경계에 대해서 잘 대응하고있다면 큰 문제가 없겠지만 개발 단계에서도 방지할 수 있다고 생각했습니다.

### 에러 대응

#### purchase-frequency Error

`/api/purchase-frequency` 에러 제거

#### /api/customer/{id}/purchases

문서에 API명세 route가 다음과 같이 되어있습니다. `/api/customer/{id}/purchases`.
하지만 Backend code를 보았을 때 `/api/customers/{id}/purchases` 로 요청해야하여
프론트 코드에서 위와같이 호출하고 있습니다.

---

### 추가된 내용

Typescript 타입 선언 컨벤션

#### 기본 원칙

- 모든 타입 선어는 기본적으로 `type`을 사용합니다.

Type 선언 방식에 `interface`와 `type`이 있지만 하나의 type 선언방식으로 정의하여 다음과 같은 효과를 기대합니다.

1. 일관성 있는 코드베이스 유지
2. 개발자의 의사결정 비용 감소
3. 명확한 컨벤션 제시

#### 계층별 타입 사용 방식

1. **API 계층**

   - Zod 스키마를 사용하여 런타임 데이터 검증
   - 스키마로부터 타입 추론 (`z.infer<typeof Schema>`)

```typescript
// 1. API 계층
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});
```

2. **Data 계층 (React Query 등)**

   - 유틸리티 타입을 활용하여 API 응답 타입과 정확한 동기화
   - 예: `type Response = Awaited<ReturnType<typeof apiFunction>>`

```typescript
// 2. Data 계층
type UserResponse = Awaited<ReturnType<typeof getUser>>;
```

3. **UI 계층 (feature, props)**
   - API 응답 전체 구조가 아닌 필요한 데이터 타입만 사용
   - 예: `type CardProps = { item: Purchase }`

```typescript
// 3. UI 계층
type UserCardProps = {
  user: User;
  onEdit?: (id: number) => void;
};
```

#### interface 사용 케이스

- 복잡한 상속 구조가 필요한 경우
- 개발자가 명확한 이유로 interface가 필요하다고 생각이 되는 경우
