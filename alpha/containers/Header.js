import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap"; 
import { navLogo } from "~/assets";
import FaSignOut from "react-icons/lib/fa/sign-out";
import { isUserAuthenticated, deauthenticateUser } from "../lib/auth";
import { setLogin } from "../actions/index";

// @connect(mapStateToProps, mapDispatchToProps)
// @withModal
class Header extends React.Component {
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    setLogin: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.logout = ::this.logout;
  }
  componentWillMount() {
    const {
      history,
      isLogin,
      setLogin,
    } = this.props;

    setLogin(isUserAuthenticated());
    if (isLogin === false) {
      history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      history,
      isLogin,
    } = this.props;
    if (isLogin !== nextProps.isLogin && !nextProps.isLogin) {
      history.push("/login");
    }
  }

  logout = () => {
    deauthenticateUser();
    this.props.setLogin(false);
  }

  render() {
    const {
      isLogin,
    } = this.props;
    return (
      <div className="navbar navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <img alt="HyperPilot Inc." src={navLogo} className="navbar-brand" />
          </Link>

          { isLogin ?
            <Button onClick={this.logout}>
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
  setLogin: isLogin => dispatch(setLogin(isLogin)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(Header);
