import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { navLogo } from "~/assets";
import { navData } from "../constants/tempData";
import SideNav from "../components/SideNav";
import _s from "./style.scss";
import { Switch, Route, Redirect } from "react-router";

// import { BrowserRouter as Router } from "react-router-dom";


/* eslint-disable */
// @connect(mapStateToProps, mapDispatchToProps)


class GrandDashboard extends React.Component {
  static propTypes = {
    // ...withModal.propTypes,
    // ...ReactTimeout.propTypes,
    // ...dispatcherProps("fetchApps", "fetchLatestIncident", "removeAppInModal", "resetAppForm"),
    // applications: PropTypes.arrayOf(HPPropTypes.app).isRequired,
    // refreshInterval: PropTypes.number,
  }

  render() {
    // const { loadingStates, applications, resetAppForm } = this.props;
    console.log("this.props.match",this.props.match);
    const { match } = this.props;
    return (
      <Switch>
      <div>
        <div className={`navbar navbar-light bg-light ${_s.navBar}`}>
          <Link to="/">
            <img alt="HyperPilot Inc." src={navLogo} className="navbar-brand" />
            <span className={_s.navTitle}>HyperPilot Sizing Analyzer</span>
          </Link>
        </div>

        <Row className={_s.routerContainer}>
          <Col className="col-2">
            <SideNav navData={navData} />
          </Col>
          
          <Col className="col-9">
             {this.props.children}
          </Col>
          
        </Row>
        {/* <CommonModal /> */}
        
      </div>
      </Switch>
    );
  }
}

const mapStateToProps = ({
  
});

const mapDispatchToProps = dispatch => ({
  
});


export default withRouter(GrandDashboard);
/* eslint-enable */
