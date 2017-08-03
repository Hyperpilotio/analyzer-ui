import React from "react";
import Button from "commons/components/Button";
import AppSelectionButton from "../AppSelectionButton";
import styles from "./index.scss";
import redisLogo from "assets/images/asset_redis_logo.svg";

const AppSelector = () => (
  <div className={styles.AppSelector}>
    <div className={styles["select-buttons"]}>
      <Button invert>Analyze All</Button>
      <Button>Select</Button>
    </div>
    <div className={styles["apps-area"]}>
      { ["Redis", "Kafka", "mongoDB", "MySQL", "Nginx"].map(app => (
        <AppSelectionButton app={app} iconUrl={redisLogo} selected={Math.random() > 0.5} />
      )) }
    </div>
  </div>
);

export default AppSelector;
