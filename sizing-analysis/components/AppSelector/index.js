import React from "react";
import Button from "commons/components/Button";
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
        <Button className={styles.Button}>
          <img src={redisLogo} /> {app}
        </Button>
      )) }
    </div>
  </div>
);

export default AppSelector;
