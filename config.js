const config = {
  analyzer: {
    host: process.env.ANALYZER_HOST || "localhost",
    port: process.env.ANALYZER_PORT || 5000,
  },
  workloadProfiler: {
    host: process.env.WORKLOAD_PROFILER_HOST || "localhost",
    port: process.env.WORKLOAD_PROFILER_PORT || 7779,
  },
  operator: {
    host: process.env.OPERATOR_HOST || "localhost",
    port: process.env.OPERATOR_PORT || 8080,
  },
  mongo: {
    host: process.env.MONGO_HOST || "localhost",
    port: process.env.MONGO_PORT || 27017,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    configdbName: process.env.CONFIGDB_NAME || "configdb",
    metricdbName: process.env.METRICDB_NAME || "metricdb",
    mockdbName: process.env.CONFIGDB_NAME || "mockdb",
    authdbName: process.env.AUTHDB_NAME || "authdb",
  },
  influx: {
    host: process.env.INFLUXDB_HOST || "localhost",
    port: process.env.INFLUXDB_PORT || 8086,
    username: process.env.INFLUXDB_USERNAME || "root",
    password: process.env.INFLUXDB_PASSWORD || "root",
  },
  jwtSecret: "hyperpilot",
};

config.analyzer.url = `http://${config.analyzer.host}:${config.analyzer.port}`;
config.workloadProfiler.url = `http://${config.workloadProfiler.host}:${config.workloadProfiler.port}`;
config.operator.url = `http://${config.operator.host}:${config.operator.port}`;
config.mongo.url = !!config.mongo.username && !!config.mongo.password
  ? `mongodb://${config.mongo.username}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}`
  : `mongodb://${config.mongo.host}:${config.mongo.port}`;

module.exports = config;
