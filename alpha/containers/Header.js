import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { navLogo } from "~/assets";
import FaSignOut from "react-icons/lib/fa/sign-out";
import { isUserAuthenticated, deauthenticateUser, getProfile } from "../lib/auth";
import { setUserInfo, logout } from "../actions/index";

// @connect(mapStateToProps, mapDispatchToProps)
// @withModal
class Header extends React.Component {
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    setLogin: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {
      history,
    } = this.props;

    // if (isUserAuthenticated) {
    //   console.log("object", getProfile());
    //   getProfile();
    //   // here shold retrieve the clusterId by 



    // } else {
    //   history.push("/login");
    // }
  }

  componentWillReceiveProps(nextProps) {
    const {
      history,
      isLogin,
    } = this.props;
    // if (isLogin !== nextProps.isLogin && !nextProps.isLogin) {
    //   history.push("/login");
    // }
  }

  render() {
    const {
      isLogin,
      logout,
    } = this.props;
    return (
      <div className="navbar navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <img alt="HyperPilot Inc." src={navLogo} className="navbar-brand" />
          </Link>

          { isLogin ?
            <Button onClick={logout}>
              <FaSignOut className="fr" />
            </Button>
            :
            <div />
          }
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
});

const mapDispatchToProps = dispatch => ({
  setUserInfo: userInfo => dispatch(setUserInfo(userInfo)),
  logout: () => {
    deauthenticateUser();
    dispatch(logout());
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(Header);
