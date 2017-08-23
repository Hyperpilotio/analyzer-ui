export default {
  analyzer: {
    host: process.env.ANALYZER_HOST || "localhost",
    port: process.env.ANALYZER_PORT || 5000
  },
  workloadProfiler: {
    host: process.env.WORKLOAD_PROFILER_HOST || "localhost",
    port: process.env.WORKLOAD_PROFILER_PORT || 7779
  },
  mongo: {
    host: process.env.MONGO_HOST || "localhost",
    port: process.env.MONGO_PORT || 27017,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    configdb: process.env.CONFIGDB_NAME || "configdb",
    metricdb: process.env.METRICDB_NAME || "metricdb"
  }
}
