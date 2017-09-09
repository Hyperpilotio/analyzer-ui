import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Button from "../Button";
import NavItemLink from "../NavItemLink";
import styles from "./Header.scss";
import { navLogo, mainMenuIcon, userIcon, orgSettingIcon } from "assets";


const Header = ({ children }) => (
  <div className={ styles.Header }>
    <header>
      <Container className={ styles.Container } flex>

        {/* HyperPilot icon */}
        <img src={ navLogo } />

        {/* Search bar */}
        <input
          className={ styles.search }
          type="search"
          placeholder="Jump to apps, status, services..."
        />

        {/* Menu and account icon */}
        <div className={ styles.sublist }>
          <img src={ mainMenuIcon } />
          <Link to="/login">
            <img src={ userIcon } />
          </Link>
        </div>

      </Container>
    </header>

    <nav>
      <Container className={ styles.Container } flex>
        <NavItemLink
          className={ styles.NavItemLink }
          activeClassName={ styles.active }
          to="/sizing-test"
          text="Sizing Analysis"
        />
        <Button className={ styles.Button }>
          <img src={ orgSettingIcon } /> Settings
        </Button>
      </Container>
    </nav>
  </div>
)

export default Header;
