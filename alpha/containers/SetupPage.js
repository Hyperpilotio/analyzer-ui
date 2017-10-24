import React from "react";
import ProgressBar from "~/commons/components/ProgressBar";


const SetupPage = () => (
  <div className="container">
    <div className="row pt-5">
      <h3>SETUP HYPERPILOT</h3>
      <ProgressBar percent={33} />
    </div>
    <div className="row pt-3">
      <div className="col">
        <nav className="nav nav-secondary nav-pills nav-fill">
          <a href="#" className="nav-item nav-link">Step 1: Select Applications</a>
          <a href="#" className="nav-item nav-link disabled">Step 2: Define SLO</a>
          <a href="#" className="nav-item nav-link disabled">Step 3: Begin HyperPiloting</a>
        </nav>
      </div>
    </div>
    <div className="row pt-5">
      <div className="col-sm-12">
        <h4>Step 1: Add Applications to HyperPilot</h4>
      </div>
    </div>
    <div className="row pt-3" style={{ height: "300px", overflow: "scroll" }}>
      {
        ["MongoDB", "Billing Service", "Internal Dashboard", "Cassandra"].map(app => (
          <div className="col-3" key={app}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ app }</h5>
                <a href="#" className="card-link">Add</a>
              </div>
            </div>
          </div>
        ))
      }
    </div>
    <hr />
    <div className="row">
      <div className="col">
        <h4>Selected Applications</h4>
      </div>
    </div>
  </div>
);

export default SetupPage;
