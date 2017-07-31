# analyzer-ui

This repository consists of two JavaScript apps:
- interference-analysis
- sizing-analysis

### Requirements
- Node.js
- npm or yarn

### Instructions (with yarn)
- `yarn install`
- `yarn dev-sizing` (or `yarn dev`) to start developing sizing analysis UI
- OR `yarn dev-interference` to start developing interference analysis UI

#### With npm
- `npm install`
- `npm run dev-sizing` (or `npm run dev`) to start developing sizing analysis UI
- `npm run dev-interference` to start developing interference analysis UI

### Configurations
These apps will have to be connected with analyzer service, you can configure the URL of analyzer service inside `config.json` (default assuming analyzer running at `localhost:5000`)

### Building (production bundle)
- `yarn build` or `npm run build`
- `yarn serve-interference` or `yarn serve-sizing` to serve the app

### Files description:
- `package.json`: Dependencies and useful scripts
- `yarn.lock`: Auto-generated lock file produced by yarn
- `webpack.config.js`: Webpack configurations
- `config.json`: Application configuration, currently there's only analyzer url option
- `server.js`: A simple Node.js script that serves the static files and proxies API calls to analyzer
- `interference-analysis/`: The app for interference analysis UI (entry point `index.js`)
- `sizing-analysis/`: The app for sizing analysis UI (entry point `index.js`)
- `assets/`: App's static assets such as images and fonts
- `styles/`: Sass stylesheets
- (`commons/`): The shared components, currently not existing yet
