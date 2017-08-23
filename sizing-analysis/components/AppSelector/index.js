import React from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-fetch";
import { Link } from "react-router-dom";
import Button from "commons/components/Button";
import AppSelectionButton from "../AppSelectionButton";
import styles from "./index.scss";
import redisLogo from "assets/images/asset_redis_logo.svg";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from "../../actions";


const AppSelector = ({addAll, apps}, {router}) =>  (
  <div className={styles.AppSelector}>
    <div className={styles["select-buttons"]}>
      <Button invert onClick={ addAll }> Select All </Button>
      <Button onClick={async event => {
        event.preventDefault();
        const res = await fetch("/api/apps/mysql/analysis/run", { method: "POST" });
        const data = await res.json();
        if (data.error === false) {
          console.log(data);
          router.history.push("/sizing-test/run-test");
        } else {
          console.error(data);
        }
      }}> Analyze </Button>
    </div>
    <div className={styles["apps-area"]}>
      { apps.map(app => (
        <AppSelectionButton key={app.appId} id={app.appId} app={app} />
      )) }
    </div>
  </div>
);

AppSelector.contextTypes = {
  router: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSelector);
