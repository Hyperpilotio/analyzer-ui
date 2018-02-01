# analyzer-ui

## Deploying

### Docker Build
- `docker build -t hyperpilot/analyzer-ui:alpha .`

### Running on a tech-demo cluster
- Deploy a cluster using deployer through executing `./deploy-gcp <username> no-snap` under [`hyperpilot-demo/workloads/tech-demo`](https://github.com/Hyperpilotio/hyperpilot-demo/tree/master/workloads/tech-demo)
- Deploy HyperPilot components through executing `kubectl create -f hyperpilot-install.yaml` under [`hyperpilot-install`](https://github.com/Hyperpilotio/hyperpilot-install)
- Run load controllers through demo-ui:
    * `kubectl create -f scripts/load-controller-deployment.json`
    * `kubectl create -f scripts/spark-load-controller-deployment.json`
- Set up GoDDD application
    * You have to at least select `goddd` deployment under `default` namespace as a microservice
    * Select goddd deployment as SLO source service, with the port of 8080
    * Select `api_booking_service_request_latency_microseconds` as the metric, with tag `summary=quantile_90`, value set to 0.1 seconds

---

This repository consists of three JavaScript apps:
- alpha
- interference-analysis
- sizing-analysis

### Requirements
- Node.js
- npm or yarn

### Instructions for Developing
- `yarn install`
- `yarn dev-server` (`npm run dev-server`) to start webpack for server side code
- `yarn dev` (`npm run dev`) to run `server.js` and start the development server for client side code

### Configurations (Environment Variables)
- `ANALYSIS_APP`: Any of `alpha`, `sizing-analysis`, `interference-analysis`, default to `alpha`
- `NODE_ENV`: Can be `production` or any thing else, setting it to `production` triggers webpack to build for production
- `ANALYZER_HOST`, `ANALYZER_PORT`: Configurations for connecting to analyzer
- `OPERATOR_HOST`, `OPERATOR_PORT`: Configurations for connecting to operator
- `MONGO_HOST`, `MONGO_PORT`, `MONGO_USERNAME`, `MONGO_PASSWORD`: Configurations for connecting to Mongo
- `CONFIGDB_NAME`, `METRICDB_NAME`: Mongo database names configurations
- `INFLUXDB_HOST`, `INFLUXDB_PORT`, `INFLUXDB_USERNAME`, `INFLUXDB_PASSWORD`: Configurations for connecting to InfluxDB

### Building Production Bundle
- `yarn build-server` or `npm run build-server`
- `yarn build` or `npm run build`
- `yarn serve` or `npm run serve` to serve the app

### Linting
- `yarn lint` (Runs `eslint`)

### File Descriptions:
- `package.json`: Dependencies and useful scripts
- `yarn.lock`: Auto-generated lock file produced by yarn
- `.eslintrc.js`: Eslint configurations

#### Server Side
- `config.js`: Configurations for application, such as Mongo URL, analyzer URL etc., they are almost always configurable through environment variables
- `server.js`: A Node.js script that imports the corresponding router module from `routers/` according to the `ANALYSIS_APP` environment variable. However it behaves differently when it's in development and production mode:
    * `NODE_ENV=development` (`NODE_ENV` is not `production`): Launches webpack dev middleware and hot middleware that not only builds the client side JavaScript code, but also hot reloading it
    * `NODE_ENV=production`: Serves the files under `dist/static/` directory as static assets, and serves all the other routes with the corresponding HTML file according to `ANALYSIS_APP`
- `webpack.server.config.js`: Webpack configuration for server side code, builds the `server.js` file into `dist/server.bundle.js`

#### Client Side
- `webpack.client.config.js`: Webpack configuration for client side code
- `alpha/` The app for Alpha 2 UI
- `sizing-analysis/`: The app for sizing analysis UI
- `interference-analysis/`: The app for interference analysis UI
- `commons/`: Shared components across different apps
- `assets/`: App's static assets such as images and fonts

### Stylesheet / Styleguide
- `npm run styleguide`: Run styleguide server to see all UI componennets at localhost:6060
- `styles/`: master stylesheets => Sizing + Interference (Sass or Scss)
- `commons/components`: UI components w/component based sass
