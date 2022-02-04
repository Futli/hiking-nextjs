import styles from "./footer.module.scss";
import React from "react";

import { Navbar, Container } from "react-bootstrap";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <Navbar
      sticky="bottom"
      className={styles.footerWapper}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container className={styles.container__footer}> 
        <Navbar.Brand className={styles.footer__logo_wrapper}>
          <img 
            className={styles.footer__logo_img}
            alt="logo_wb.svg"
            src="/logo_wb.svg"
          />
          <p className={styles.footer__logo_text}> 
            ул. Карла Маркса, 49 <br />
            +7 (391) 227-92-01 <br />
            krashiking@gmail.com
          </p>
        </Navbar.Brand>

        <Navbar.Brand className={styles.footer__links_wraper}>
          <Link href="/events" passHref>
            <p className={styles.footer__link_text}> 
              Мероприятия
            </p>
          </Link>

          <Link href="/news" passHref>
            <p className={styles.footer__link_text}> 
              Новости
            </p>
          </Link>

          <Link href="/places" passHref>
            <p className={styles.footer__link_text}> 
              Места
            </p>
          </Link>

          <Link href="/routes" passHref>
            <p className={styles.footer__link_text}> 
              Маршруты
            </p>
          </Link>

          <Link href="/areas" passHref>
            <p className={styles.footer__link_text}> 
              Районы
            </p>
          </Link>

          <Link href="/about" passHref>
            <p className={styles.footer__link_text}> 
              О проекте
            </p>
          </Link>

          <Link href="/" passHref>
            <p className={styles.footer__link_text}> 
              Карта
            </p>
          </Link>
        </Navbar.Brand>
        <Navbar.Brand className={styles.footer__partner_wrapper}>
          <p className={styles.footer__link_text} > {/* ,styles.opensans-normal-silver-px */}
            Партнеры проекта:
          </p>

          <br />

          <img className={styles.krascp} alt="logo-krascp.svg" src="/logo-krascp.svg" />

          <div className={styles.partner__frame}>
            <Link 
                rel="noopener noreferrer"
                target="_blank" 
                href="http://www.doopt.ru/"
                passHref
            >
              <a className={styles.oopt}>
                <img className={styles.oopt} alt="logo-oopt.svg" src="/logo-oopt.svg" />
                <p className={styles.oopt}> 
                  КГКУ Дирекция по особо 
                  <br />
                  охраняемым природным
                  <br />
                  территориям Красноярского края
                  <br />
                </p>
              </a>
            </Link>
          </div>
        </Navbar.Brand>

        <Navbar.Brand>
          <div className={styles.copyright}>
            <div className={styles.social__links}>
              <Link
                className={styles.social__link_frame}
                rel="noopener noreferrer"
                target="_blank"
                href="https://vk.com/krashiking"
                passHref
              >
                <img alt="vk.svg"  src="/vk.svg" />
              </Link>

              <Link
                className={styles.social__link_frame}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/krashiking/"
                passHref
              >
                <img alt="facebook.svg"  src="/facebook.svg" />
              </Link>

              <Link className={styles.social__link_frame}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/krashiking/"
                passHref
              >
                <img alt="instagram.svg"  src="/instagram.svg" />
              </Link>
              <Link className={styles.social__link_frame}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@krashiking"
                passHref
              >
                <img alt="tiktok.svg"  src="/tiktok.svg" />
              </Link>
              <Link className={styles.social__link_frame}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UC4DpovlN05jNB5AS-nCLN2w"
                passHref
              >
                <img alt="youtube.svg" src="/youtube.svg" />
              </Link>
              <Link className={styles.social__link_frame}
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/krashiking"
                passHref
              >
                <img alt="telegram.svg"  src="/telegram.svg" />
              </Link>
            </div>

            <div className={styles.text1}>
              <div className="goloka ">
                Дизайн: GOLOKA
              </div>
              <div className="text-11  ">
                © Красноярский Хайкинг 2021
              </div>
            </div>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}