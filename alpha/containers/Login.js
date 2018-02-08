import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import ReactRouterPropTypes from "react-router-prop-types";
import { actions as formActions, Form, Control, Errors } from "react-redux-form";
import _s from "./style.scss";
import withModal from "../lib/withModal";
import { manualLogin } from "../actions/index";

// @connect(mapStateToProps, mapDispatchToProps)
// @withModal
class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    loadingState: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    const {
      isLogin,
      history,
    } = this.props;
    if (isLogin) {
      history.push("/");
    }
    this.props.resetForm();
  }

  submitLoginForm = (formData) => {
    const { history } = this.props;
    this.props.login(formData, history);
  }

  render() {
    const {
      loadingState,
    } = this.props;
    return (
      <div>
        <Row className={_s.loginTitle}>
          <Col md={{ size: 4, offset: 4 }}>
            <h1>Welcome to HyperPilot</h1>
            <h6>Keep track of your monitoring data with incident detection and diagnosis for better performance.</h6>
          </Col>
        </Row>
        <Row className={_s.loginBg}>
          <Col className={`mb-5 ${_s.loginCard}`} md={{ size: 4, offset: 4 }}>

            <Row>
              <Form
                model="authForm.login"
                className="col-10 offset-1 mt-4"
                onSubmit={this.submitLoginForm}
              >
                <div className={_s.inputRow}>
                  <div className={`form-group ${_s.formGroup}`}>
                    <label htmlFor="auth-username">Username</label>
                    <Control.text
                      model=".email"
                      id="auth-username"
                      className="form-control"
                      placeholder="Enter username"
                      validators={{ required: val => val && val.length }}
                    />
                    <div className={_s.errorHint}>
                      <Errors
                        wrapper={props => (<div className={_s.errorMessage}>{props.children}</div>)}
                        model=".email"
                        show={field => field.touched && !field.focus}
                        messages={{
                          required: "Please type username",
                        }}
                      />
                    </div>
                  </div>
                
                </div>

                <div className={_s.inputRow}>
                  <div className={`form-group ${_s.formGroup}`}>
                    <label htmlFor="auth-passpord">Password</label>
                    <Control.text
                      model=".password"
                      id="auth-passpord"
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      validators={{ required: val => val && val.length }}
                    />
                    <div className={_s.errorHint}>
                      <Errors
                        wrapper={props => (<div className={_s.errorMessage}>{props.children}</div>)}
                        model=".password"
                        show={field => field.touched && !field.focus}
                        messages={{
                          required: "Please type your password",
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className={_s.buttonRow}>
                  <Button
                    className={_s.loginBtn}
                    isLoading={loadingState.createApp.pending}
                    color="primary"
                  >Login</Button>
                </div>
              </Form>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = ({ ui: { CREATE_APP }, auth }) => ({
  isLogin: auth.isLogin,
  loadingState: {
    createApp: CREATE_APP,
  },
});

const mapDispatchToProps = dispatch => ({
  login: (formData, history) => dispatch(manualLogin(formData, history)),
  resetForm: () => dispatch(formActions.reset("authForm.login")),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withModal,
)(Login);
