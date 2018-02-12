import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { navLogo } from "~/assets";
import { navData } from "../constants/tempData";
import SideNav from "../components/SideNav";
import _s from "./style.scss";

const mapStateToProps = ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

/* eslint-disable */
// @connect(mapStateToProps, mapDispatchToProps)


export default class GrandDashboard extends React.Component {
  static propTypes = {
    // ...withModal.propTypes,
    // ...ReactTimeout.propTypes,
    // ...dispatcherProps("fetchApps", "fetchLatestIncident", "removeAppInModal", "resetAppForm"),
    // applications: PropTypes.arrayOf(HPPropTypes.app).isRequired,
    // refreshInterval: PropTypes.number,
  }

  render() {
    // const { loadingStates, applications, resetAppForm } = this.props;
    return (
      <div>
        <div className={`navbar navbar-light bg-light ${_s.navBar}`}>
          <Link to="/">
            <img alt="HyperPilot Inc." src={navLogo} className="navbar-brand" />
            <span className={_s.navTitle}>HyperPilot Sizing Analyzer</span>
          </Link>
        </div>

        <Row className={_s.routerContainer}>
          <Col>
            <SideNav navData={navData} />
          </Col>
          <Col>
            {this.props.children}
          </Col>
        </Row>
        {/* <CommonModal /> */}
      </div>
    );
  }
}
/* eslint-enable */
