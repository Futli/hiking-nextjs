import { Navbar, Nav, Container } from "react-bootstrap";

import styles from "./navibar.module.scss";
import Link from "next/link";
import Image from "next/image";


export function NaviBar({ children }) {
    return (
      <>
        <Navbar
          collapseOnSelect
          expand="xl"
          bg="dark"
          variant="dark"
        >
          <Container className={styles.containerNavibar}>
              <Link  href="/main" passHref>
                <Navbar.Brand href="/">
                  <img 
                    className={styles.logo} 
                    alt="Красноярский Хайкинг" 
                    src="/logo-main.svg"
                  />
                </Navbar.Brand>
              </Link>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav ">

              <Nav>
                <Link href="/events" passHref>
                  <Navbar.Brand href="/events" className={styles.text_nav}>
                    МЕРОПРИЯТИЯ
                  </Navbar.Brand>
                </Link>
                <Link href="/news" passHref>
                  <Navbar.Brand href="/news" className={styles.text_nav}>
                    НОВОСТИ
                    </Navbar.Brand>
                </Link>
                <Link href="/places" passHref>
                  <Navbar.Brand href="/places" className={styles.text_nav}>
                    МЕСТА
                  </Navbar.Brand>
                </Link>
                <Link href="/routes" passHref>
                  <Navbar.Brand href="/routes" className={styles.text_nav}>
                    МАРШРУТЫ
                  </Navbar.Brand>
                </Link>
                <Link href="/areas" passHref>
                  <Navbar.Brand href="/areas" className={styles.text_nav}>
                    РАЙОНЫ
                  </Navbar.Brand>
                </Link>
                <Link href="/about" passHref>
                  <Navbar.Brand href="/about" className={styles.text_nav}>
                    О ПРОЕКТЕ
                  </Navbar.Brand>
                </Link>
                <Link href="/" passHref>
                  <Navbar.Brand href="/" className={styles.text_nav}>
                    <img className="mr-16" alt="map.svg" src="/map.svg" /> 
                    КАРТА
                  </Navbar.Brand>
                </Link>

              </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
}