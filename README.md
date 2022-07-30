# react-ts-swc-starter

Starter code for React / TypeScript projects ; uses swc as transformer

## Installation

### Requirements
* [Node.js v14+](https://nodejs.org/)

```bash
npm install
```

## Starting the development server

```bash
npm start
```

## Building the application

```bash
npm run build
```

## Environment configuration

Similar to [Create React App](https://github.com/facebook/create-react-app), environment variables can be set for
production and development environments.

### `.env` file prioritisation
1. `.env.{ENVIRONMENT}.local`
2. `.env.{ENVIRONMENT}`
3. `.env.local`
4. `.env`

### Default environment variables
* `BASE_PATH`
* `DEV_AUTO_OPEN` : Automatically open the web application in a browser
* `DEV_PORT` : Port to bind the dev server

Additional environment variables can be used in-app as long as these are prefixed with `REACT_APP_`.

## Technologies used

* [ESLint](https://eslint.org/)
* [husky](https://github.com/typicode/husky)
* [Jest](https://jestjs.io)
* [lint-staged](https://github.com/okonet/lint-staged)
* [Prettier](https://prettier.io/)
* [React](https://reactjs.org)
* [React Router](https://github.com/remix-run/react-router)
* [React Testing Library](https://testing-library.com/)
* [swc](https://swc.rs/)
* [Tailwind CSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Webpack](https://webpack.js.org/)

## License
MIT
