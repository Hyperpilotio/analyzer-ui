import React from "react";
import { Link } from "react-router-dom";
import Button from "commons/components/Button";
import AppSelectionButton from "../AppSelectionButton";
import styles from "./index.scss";
import redisLogo from "assets/images/asset_redis_logo.svg";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../actions";


const AppSelector = ({addAll, apps}) =>  (
  <div className={styles.AppSelector}>
    <div className={styles["select-buttons"]}>
      <Button invert onClick={ addAll }> Select All </Button>
      <Link to="/sizing-test/run-test" className={styles.Button}>
        Analyze
      </Link>
    </div>
    <div className={styles["apps-area"]}>
      { apps.map(app => (
        <AppSelectionButton key={app.appId} id={app.appId} app={app} />
      )) }
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(AppSelector);
