import styles from "./burger-menu.module.scss";
import React from 'react';

import { Offcanvas,
  OffcanvasHeader, OffcanvasTitle, OffcanvasBody,
  ListGroup, Image } from 'react-bootstrap';

import Link from "next/link";

import moment from 'moment';


const BurgerMenu = ({ show, onClose }) => {
    return (
      <Offcanvas placement="end" show={show} onHide={onClose}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle className={styles.form}>
            <img alt="logo" src="logo.svg" rounded className={styles.logo} />
            Красноярский хайкинг
          </OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <ListGroup  variant="flush">

            <Link href={'/select-area'} key={1} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="area" src="area.svg" rounded />
                  <p className={styles.title}>
                    Красноярск
                  </p>
                  <img alt="array" src="go-arrow.svg" rounded className={styles.image} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/events'} key={2} passHref>
              <ListGroup.Item disabled>
                <div className={styles.container}>
                  <img alt="events" src="events.svg" rounded />
                  <p className={styles.title}>
                    Мероприятия
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/areas'} key={3} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="areas" src="areas.svg" rounded />
                  <p className={styles.title}>
                    Районы
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/about'} key={4} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="about" src="about.svg" rounded />
                  <p className={styles.title}>
                    О проекте
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/app'} key={5} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="app" src="app.svg" rounded />
                  <p className={styles.title}>
                    iOS / Android
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/feedback'} key={6} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="feedback" src="feedback.svg" rounded />
                  <p className={styles.title}>
                    Обратная связь / Справка
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

          </ListGroup>
          <div className={styles.form}>
            <p>Дизайн <b>GOLOKA</b></p>
            <p>Красноярский хайкинг {moment().format('YYYY')}</p>
          </div>
        </OffcanvasBody>
      </Offcanvas> 
    );
  };
  
  export default BurgerMenu;