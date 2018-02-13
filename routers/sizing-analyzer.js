import express from "express";
import request from "request-promise-native";
import { InfluxDB } from "influx";
import _ from "lodash";
import winston from "winston";
import config from "../config";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `[${_.toUpper(info.level)}] ${info.timestamp} - ${info.message}`),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

const router = express();

const influxClient = new InfluxDB(config.influx);

const asyncMiddleware = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    let message = e.message;
    if (e.name === "StatusCodeError") {
      if (_.has(e.response.body, "cause")) {
        // Catching operator errors
        message = e.response.body.cause;
      } else if (_.has(e.response.body, "error")) {
        // Catching analyzer errors
        message = e.response.body.error;
      }
    }
    if (!e.alreadyLogged) {
      logger.error(e);
    }
    res.status(500).json({
      success: false,
      message,
    });
  }
};

["get", "post"].forEach((method) => {
  router[method] = _.wrap(
    ::router[method],
    (register, ...args) => {
      if (args.length === 2) {
        const [path, fn] = args;
        if (_.isString(path) && _.isFunction(fn)) {
          return register(path, asyncMiddleware(fn));
        }
      }
      return register(...args);
    },
  );
});

router.get("/api/", (req, res) => {
  res.json({ status: "ok" });
});

router.post("/api/influx-data", async (req, res) => {
  const tagsFilter = _.map(req.body.tags, ({ key, value }) => `AND "${key}" = '${value}' `).join(" ");
  const query = `
    SELECT mean(value) AS value FROM "${req.body.metric}"
    WHERE time >= ${req.body.start}
    AND time <= ${req.body.end}
    ${tagsFilter}
    GROUP BY time(5s)
  `;
  const result = await influxClient.queryRaw(query, { database: req.body.db, precision: "ms" });

  res.json(_.get(result, "results.0.series.0"));
});

export default router;
