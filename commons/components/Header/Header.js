import React from "react";
import { Link } from "react-router-dom";
import { navLogo, mainMenuIcon, userIcon, orgSettingIcon } from "~/assets";
import Container from "../Container";
import Button from "../Button";
import NavItemLink from "../NavItemLink";
import styles from "./Header.scss";


const Header = () => (
  <div className={styles.Header}>
    <header>
      <Container className={styles.Container} flex>

        {/* HyperPilot icon */}
        <img src={navLogo} alt="HyperPilot" />

        {/* Search bar */}
        <input
          className={styles.search}
          type="search"
          placeholder="Jump to apps, status, services..."
        />

        {/* Menu and account icon */}
        <div className={styles.sublist}>
          <img src={mainMenuIcon} alt="Main Menu" />
          <Link to="/login">
            <img src={userIcon} alt="Account" />
          </Link>
        </div>

      </Container>
    </header>

    <nav>
      <Container className={styles.Container} flex>
        <NavItemLink
          className={styles.NavItemLink}
          activeClassName={styles.active}
          to="/sizing-test"
          text="Sizing Analysis"
        />
        <Button className={styles.Button}>
          <img src={orgSettingIcon} alt="Settings" /> Settings
        </Button>
      </Container>
    </nav>
  </div>
);

export default Header;
