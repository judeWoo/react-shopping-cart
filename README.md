# React Shopping Cart

이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app)을 부트스트랩해서 만들었습니다.

## 실행 하는법

```zsh
git clone https://github.com/judeWoo/react-shopping-cart.git
cd react-shopping-cart
npm install
npm run build
npx serve -s build
```

[http://localhost:5000](http://localhost:5000)를 열어 브라우저에서 볼 수 있습니다.

## 주요 테크 스택

- React 17
- Create React App 4.0.1
- Material UI 4.11.2
- Eslint 7.17.0
- React Router Dom 6.0.0-beta.0

## 사용 가능한 스크립트

프로젝트 디렉토리 안에서, 다음 커맨드를 실행할 수 있습니다:

### `npm start`

Development 모드에서 앱을 실행 시킵니다.\
[http://localhost:3000](http://localhost:3000)를 열어 브라우저에서 볼 수 있습니다.

코드를 변경하면 페이지가 리로드 됩니다.\
콘솔에 lint 에러를 볼 수 있습니다.

### `npm test`

인터렉티브 watch mode에서 test runner를 실행 시킵니다.\
더 많은 정보는 [테스트 실행하기](https://facebook.github.io/create-react-app/docs/running-tests)에서 확인할 수 있습니다.

### `npm build`

`build` 폴더에 production mode의 프로젝트를 생성합니다.\
production mode의 React를 올바르게 빌드하고 최고의 퍼포먼스를 위해서 최적화를 합니다.

The build is minified and the filenames include the hashes.\
이 build는 minified 되어 있고 파일 이름들에는 hash가 들어있습니다.\

더 많은 정보는 [배포하기](https://facebook.github.io/create-react-app/docs/deployment)에서 확인할 수 있습니다.

## 추가 사항

1. /products 페이지에 `검색` 기능을 추가하였습니다 (score 내림차순으로 표기됩니다).
2. /cart 페이지에 `결제하기` 기능을 추가하였습니다.
3. /cart 페이지에 `쿠폰 적용이 불가한 상품 표기` 기능을 추가하였습니다.
4. /cart 페이지에 `장바구니에 담긴 상품 삭제` 기능을 추가하였습니다.
5. 사용자의 모든 장바구니 데이터는 `localStorage`에 저장됩니다.
