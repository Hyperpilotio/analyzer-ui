import React from "react";
import { Route } from "react-router-dom";
import ProgressBar from "~/commons/components/ProgressBar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const SetupPage = () => (
  <div className="container">
    <div className="row pt-5">
      <div className="col">
        <h3>SETUP HYPERPILOT</h3>
        <ProgressBar percent={33} />
      </div>
    </div>
    <div className="row pt-3">
      <div className="col">
        <ul className="nav nav-secondary nav-pills nav-fill">
          <li className="nav-item nav-link text-primary">Step 1: Select Applications</li>
          <li className="nav-item nav-link text-secondary">Step 2: Define SLO</li>
          <li className="nav-item nav-link text-secondary">Step 3: Begin HyperPiloting</li>
        </ul>
      </div>
    </div>
    <Route path="/setup/1" component={StepOne} />
    <Route path="/setup/2" component={StepTwo} />
    <Route path="/setup/3" component={StepThree} />
  </div>
);

export default (SetupPage);
