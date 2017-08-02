import React from "react";
import TestStagesJumbotron from "../TestStagesJumbotron";
import { STAGE_CONFIG, STAGE_TEST, STAGE_RESULT } from "../../constants";

const BenchmarkRunnerPage = () => (
  <div>
    <TestStagesJumbotron stage={STAGE_CONFIG} />
  </div>
);

export default BenchmarkRunnerPage;
