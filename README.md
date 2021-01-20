# DSC_web_backend

Express.js + MongoDB w/ Docker.

## 구조

- 📂 `DSC_web_backend/` (프로젝트 폴더)
  - 📂 `.vscode/` (VS Code Workspace 설정 폴더)
    - 📄 `settings.json` (VS Code Workspace 설정 파일)
  - 📁 `node_modules/` (node_module이 담긴 폴더)
  - 📁 `db/` (Docker로 실행된 MongoDB이 생성한 파일들이 담긴 폴더)
  - 📂 `config/` (서버 설정이 담긴 폴더)
    - 📄 `index.js` (서버 설정 appConfig)
    - 📄 `development.js` (development 모드 설정 devConfig)
    - 📄 `production.js` (production 모드 설정 prodConfig)
  - 📂 `module/` (Resource들을 모은 폴더)
    - 📂 `todo/` (Resource 예시 중 하나)
      - 📄 `todo.controller.js` (MongoDB에서 해당 Resource를 처리할 Method들을 정의)
      - 📄 `todo.model.js` (Resource 모델링)
      - 📄 `todo.routes.js` (Resource에 대한 routes 정의)
  - 📂 `routes/`
    - 📂 `api/`
      - 📄 `index.js` (Resource에 대한 routes를 쓰는 apiRoutes를 정의)
    - 📄 `index.js` (app.js에서 쓰는 mainRoutes를 정의)
  - 📂 `utils/`
    - 📄 `asyncWrapper.js`
  - 📄 `LICENSE`
  - 📄 `.gitignore`
  - 📄 `.babelrc` (ES6를 사용할 수 있도록 Babel 사용)
  - 📄 `.eslintrc.json` (eslint 설정 파일)
  - 📄 `app.js`
  - 📄 `Dockerfile.dev` (Express 서버 Dockerfile)
  - 📄 `docker-compose.yaml` (Express 서버와 MongoDB 서버를 도커 컨테이너로 실행하는 스크립트)
  - 📄 `package.json`
  - 📄 `state.of.the.art.js`

## 시작하기 전에

- 로컬에서 개발할 때 무리가 없도록 아래와 같은 설정을 했습니다.
  - node module로 eslint, prettier를 미리 설정해두었기 때문에, VS Code에서 ESLint와 Prettier Extension을 설치하면 저장할 때마다 자동으로 컨벤션에 맞춰 수정됩니다.
  - 개발 환경의 통일성과 편의성을 위해 Docker를 도입했습니다. VS Code에서 Docker Extension을 설치하면 편합니다. development 모드로 Express 앱과 MongoDB가 컨테이너로 같이 실행됩니다. Nodemon으로 실행하기 때문에 이 상태에서 코드를 수정하면서 실시간으로 변화를 볼 수 있습니다.
  - API Documentation까지 했으면 좋았겠지만 시간이 없어서 아직 안했습니다 ㅎㅎ
- Swagger, Apidocs 등의 API Documentation은 프론트엔드 팀과 협업할 때 매우 큰 도움이 됩니다. 프론트엔드 팀도 연동을 위해 해당 프로젝트를 실행할 필요가 있으니, 협업을 시작하기 전에 구현하는 것이 좋습니다.
- 필요한 Resource에 대해 DB 모델링과 API를 구현하고 추가할 때, `module/todo` 를 참고하시면 코드를 거의 바꿀 필요 없이 처리하실 수 있을 거에요!

## How to control in development mode

```shell
# 컨테이너들 실행
docker-compose up -d
# 컨테이너들 종료
docker-compose down
# 컨테이너들 재시작
docker-compose restart
```

## How to control in production mode

```shell
# express 앱 빌드 후 시작
yarn start
```
