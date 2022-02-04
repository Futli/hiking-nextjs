import React from "react";
import styles from "./navibar-mobile.module.scss";
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'leaflet/dist/leaflet.css';

export function NaviBarMobile() {
  const router = useRouter();
  return (
    <>
    <div className={styles.navbarMobile}>
      <ul className={styles.navibar}>
        <li className={styles.navbar_item}>
          <Link href = "/" passHref>
            <a className={router.pathname == "/" ? `${styles.homeActive}` : `${styles.home}` }>
              <p className={styles.nav_text}>Главная</p>
            </a>
          </Link>
        </li>
        <li className={styles.navbar_item}>
          <Link href = "/news" passHref>
            <a as="/dynamic-route" className={router.pathname == "/news" || router.pathname ==  "/news/[id]" ? `${styles.newsActive}` : `${styles.news}` }>
              <p className={styles.nav_text}>Новости</p>
            </a>
          </Link>
        </li>
        <li className={styles.navbar_item}>
          <Link href = "/routes" passHref>
            <a className={router.pathname == "/routes" ? `${styles.routesActive}` : `${styles.routes}` }>
              <p className={styles.nav_text}>Маршруты</p>
            </a>
          </Link>
        </li>
        <li className={styles.navbar_item}>
          <Link href="/places" passHref>
            <a  className={router.pathname == "/places" ? `${styles.placesActive}` : `${styles.places}` }>
              <p className={styles.nav_text}> Места</p>
            </a>
          </Link>
        </li>
      </ul>
    </div>
    </>
  );
}