# analyzer-ui

## Deploying

1. Initialize Cluster
    - Start deployer
    - `./deploy-gcp.sh <username>`
2. Restore mongo data
    - cd into the root directory of analyzer
    - `kubectl port-forward -n hyperpilot $(kubectl get pods -n hyperpilot | grep 'mongo-serve', awk '{print $1;}') 27017:27017`
    - In another window, do `mongo mongo-service/create-dbuser.js`
    - `mongoimport -d resultdb -c diagnoses workloads/diagnoses.json`
    - `mongoimport -d resultdb -c incidents workloads/incident-0001.json`
    - `mongoimport -d resultdb -c problems workloads/problems-incident-0001`
    - After all, it's ok to stop forwarding 27017 port
3. Restore influx data
    - Assume there's a backed up data in your locally running influx (using `hyperpilot-demo/hyperpilot_influx_restore.sh`)
    - Run `./restore_influx.sh` (Assuming there's an influx running on localhost:8086), this is going to take some time, it can be about 20 mins.



This repository consists of three JavaScript apps:
- alpha
- interference-analysis
- sizing-analysis

### Requirements
- Node.js
- npm or yarn

### Instructions (with yarn)
- `yarn install`
- `yarn dev-server` to start webpack fro server side code
- `yarn dev` to start dev server

#### With npm
- `npm install`
- `npm run server-dev` to start webpack for server side code
- `npm run dev` to start server with webpack dev mode and client code webpack bundling

### Configurations
These apps will have to be connected with analyzer service, you can configure the URL of analyzer service inside `config.json` (default assuming analyzer running at `localhost:5000`)

### Building (production bundle)
- `yarn build` or `npm run build`
- `yarn serve` to serve the app

### Files description:
- `package.json`: Dependencies and useful scripts
- `yarn.lock`: Auto-generated lock file produced by yarn
- `webpack.config.js`: Webpack configurations
- `config.json`: Application configuration, currently there's only analyzer url option
- `server.js`: A simple Node.js script that serves the static files and proxies API calls to analyzer
- `interference-analysis/`: The app for interference analysis UI (entry point `index.js`)
- `sizing-analysis/`: The app for sizing analysis UI (entry point `index.js`)
- `assets/`: App's static assets such as images and fonts

- (`commons/`): The shared components, currently not existing yet

### Stylesheet / Styleguide
- `npm run styleguide`: Run styleguide server to see all UI componennets at localhost:6060
- `styles/`: master stylesheets => Sizing + Interference (Sass or Scss)
- `commons/components`: UI components w/component based sass
