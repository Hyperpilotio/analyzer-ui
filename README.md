# analyzer-ui

This repository consists of two JavaScript apps:
- interference-analysis
- sizing-analysis

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
