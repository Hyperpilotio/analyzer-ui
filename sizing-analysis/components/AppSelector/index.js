import React from "react";
import { Link } from "react-router-dom";
import Button from "commons/components/Button";
import AppSelectionButton from "../AppSelectionButton";
import styles from "./index.scss";
import redisLogo from "assets/images/asset_redis_logo.svg";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../actions";


const AppSelector = (props) =>  (
  <div className={styles.AppSelector}>
    <div className={styles["select-buttons"]}>
      <Link
        to="/sizing-test/run-test" onClick={props.addAll}
        className={`${styles.Button} ${styles.invert}`}>
        Analyze All
      </Link>
      <Link
        to="/sizing-test/run-test" className={`${styles.Button}`}>
        Analyze Selected
      </Link>
    </div>
    <div className={styles["apps-area"]}>
      { props.reducer[0].apps.map(app => (
        <AppSelectionButton key={app.appId} id={app.appId} app={app} iconUrl={redisLogo}  />
      )) }
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(AppSelector);
