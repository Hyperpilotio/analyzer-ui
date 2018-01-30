import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Portal, VictoryPortal } from "victory-core";

export class AutoBreadcrumb extends Portal {
  static displayName = "AutoBreadcrumb"
  static propTypes = Breadcrumb.propTypes
  static defaultProps = Breadcrumb.defaultProps

  render() {
    const children = this.getChildren();
    const activeItem = _.last(children);
    return (
      <Breadcrumb {...this.props}>
        {_.initial(children)}
        {activeItem && React.cloneElement(activeItem, { active: true })}
      </Breadcrumb>
    );
  }
}

const WrappedBreadcrumbItem = ({ active, link, text }) => (
  <BreadcrumbItem active={active}>
    { active ? text : <Link to={link}>{ text }</Link> }
  </BreadcrumbItem>
);

export class AutoBreadcrumbItem extends VictoryPortal {
  static displayName = "AutoBreadcrumbItem"
  static defaultProps = {}

  render() {
    return this.renderPortal(<WrappedBreadcrumbItem {...this.props} />);
  }
}

export const withAutoBreadcrumb = WrappedComponent => class extends React.Component {
  static displayName = `withAutoBreadcrumb(${WrappedComponent.displayName || WrappedComponent.name})`

  static childContextTypes = {
    portalUpdate: PropTypes.func,
    portalRegister: PropTypes.func,
    portalDeregister: PropTypes.func,
  }

  getChildContext() {
    return {
      portalUpdate: this.portalUpdate,
      portalRegister: this.portalRegister,
      portalDeregister: this.portalDeregister,
    };
  }

  componentWillMount() {
    this.savePortalRef = (portal) => {
      this.portalRef = portal;
      return portal;
    };
    this.portalUpdate = (key, el) => this.portalRef.portalUpdate(key, el);
    this.portalRegister = () => this.portalRef.portalRegister();
    this.portalDeregister = key => _.invoke(this.portalRef, "portalDeregister", key);
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        breadcrumb={<AutoBreadcrumb ref={this.savePortalRef} />}
      />
    );
  }
};
