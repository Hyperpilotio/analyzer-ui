import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { connect as connectRefetch, PromiseState } from "react-refetch";
import Jumbotron from "~/commons/components/Jumbotron";
import Container from "~/commons/components/Container";
import Navbar from "~/commons/components/Navbar";
import NavItemLink from "~/commons/components/NavItemLink";
import { AnalyzerPropTypes } from "../../reducers/sizingReducer";
import ResultTable from "../ResultTable";
import ResultFigure from "../ResultFigure";
import KeySummary from "../KeySummary";
import ProgressIndicator from "../ProgressIndicator";
import { STAGE_RESULT } from "../../constants";
import { mapStateToProps, mapDispatchToProps } from "../../actions";
import styles from "./SizingResultsPage.scss";


class SizingResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { highlightedInstance: null };
  }

  onHighlight = (instance) => {
    this.setState({
      highlightedInstance: instance,
    });
  }

  onUnhighlight = () => {
    this.setState({
      highlightedInstance: null,
    });
  }

  render() {
    const {
      match: { params: appName },
      history, apps,
      instancesFetch, analysisFetch,
    } = this.props;

    if (_.isEmpty(appName)) {
      const firstSelectedApp = _.find(apps, { selected: true });
      if (!_.isUndefined(firstSelectedApp)) {
        history.replace(`/sizing-test/result/${firstSelectedApp.name}`);
      }
      return <div />;
    }

    if (analysisFetch.fulfilled) {
      analysisFetch.value = {
        ...analysisFetch.value,
        recommendations: _.filter(
          analysisFetch.value.recommendations,
          { objective: "MaxPerfOverCost" },
        ),
      };
    }

    return (
      <div>
        <Jumbotron>
          <ProgressIndicator
            className={styles.ProgressIndicator}
            stage={STAGE_RESULT}
          />
          <div className={styles["testing-summary"]}>
            <p>Testing summary</p>
            <main>
              <KeySummary title="App tested" value="1" />
              <KeySummary title="Running time" value="2:15" />
              <KeySummary title="Instances ran" value="11" />
            </main>
          </div>
        </Jumbotron>
        <Navbar>
          {
            _.filter(apps, "selected").map(app => (
              <NavItemLink
                key={app.name}
                className={styles.NavItemLink}
                activeClassName={styles.selected}
                to={`/sizing-test/result/${app.name}`}
              >
                <img src={app.logo} alt={app.displayName} /> {app.displayName}
              </NavItemLink>
            ))
          }
        </Navbar>
        {
          (!analysisFetch.fulfilled || !instancesFetch.fulfilled)
            ? "Loading..."
            : (
              <Container className={styles["results-content"]}>
                <div>
                  <p>&nbsp;</p>
                  <ResultTable
                    data={analysisFetch.value}
                    className={styles.ResultTable}
                    highlightedInstance={this.state.highlightedInstance}
                    onHighlight={this.onHighlight}
                    onUnhighlight={this.onUnhighlight}
                  />
                </div>
                <div>
                  <p>Performance (TPM)</p>
                  <ResultFigure
                    className={styles.ResultFigure}
                    data={analysisFetch.value}
                    instancesData={instancesFetch.value}
                    highlightedInstance={this.state.highlightedInstance}
                    onHighlight={this.onHighlight}
                    onUnhighlight={this.onUnhighlight}
                  />
                  <p style={{ float: "right" }}>Cost ($/month)</p>
                </div>
              </Container>
            )
        }
      </div>
    );
  }
}

SizingResultsPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  apps: PropTypes.arrayOf(AnalyzerPropTypes.app),
  analysisFetch: PropTypes.instanceOf(PromiseState).isRequired,
  instancesFetch: PropTypes.instanceOf(PromiseState).isRequired,
};

SizingResultsPage.defaultProps = {
  apps: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  connectRefetch(({ match }) => ({
    analysisFetch: `/api/apps/${match.params.appName}/analysis`,
    instancesFetch: "/api/instances/us-east-1",
  }))(SizingResultsPage),
);
