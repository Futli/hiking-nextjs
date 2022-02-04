import styles from "./burger-menu.module.scss";
import React from 'react';

import { Offcanvas,
  OffcanvasHeader, OffcanvasTitle, OffcanvasBody,
  ListGroup, Image } from 'react-bootstrap';

import Link from "next/link";

import moment from 'moment';

const BurgerMenuD = ({ show, onClose }) => {
    
    return (
      <Offcanvas placement="end" show={show} onHide={onClose}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle className={styles.form}>
            <img alt="logo" src="logo.svg" className={styles.logo} />
            Красноярский хайкинг
          </OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <ListGroup  variant="flush">

           {/*  <Link href={'/select-area'} key={1} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="area" src="area.svg" rounded />
                  <p className={styles.title}>
                    Красноярск
                  </p>
                  <img alt="array" src="go-arrow.svg" rounded className={styles.image} />
                </div>
              </ListGroup.Item>
            </Link> */}
            <Link href={'/news'} key={1} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="news" src="news.svg" rounded />
                  <p className={styles.title}>
                    Новости
                  </p>
                </div>
              </ListGroup.Item>
            </Link>
            <Link href={'/routes'} key={2} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="routes" src="routes.svg" rounded />
                  <p className={styles.title}>
                    Маршруты
                  </p>
                </div>
              </ListGroup.Item>
            </Link>
            <Link href={'/places'} key={3} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="places" src="places.svg" rounded />
                  <p className={styles.title}>
                    Места
                  </p>
                </div>
              </ListGroup.Item>
            </Link>
            <Link href={'/events'} key={4} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="events" src="events.svg" rounded />
                  <p className={styles.title}>
                    Мероприятия
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/areas'} key={5} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="areas" src="areas.svg" rounded />
                  <p className={styles.title}>
                    Районы
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/about'} key={6} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="about" src="about.svg" rounded />
                  <p className={styles.title}>
                    О проекте
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/app'} key={7} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="app" src="app.svg" rounded />
                  <p className={styles.title}>
                    iOS <br/> Android
                  </p>
                </div>
              </ListGroup.Item>
            </Link>

            <Link href={'/feedback'} key={8} passHref>
              <ListGroup.Item action>
                <div className={styles.container}>
                  <img alt="feedback" src="feedback.svg" rounded />
                  <p className={styles.title}>
                    Обратная связь <br/>
                    Справка
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
  
  export default BurgerMenuD;
