import styles from "./burger-menu.module.scss";
import React from 'react';

import { Offcanvas,
  OffcanvasHeader, OffcanvasTitle, OffcanvasBody,
  ListGroup, Image } from 'react-bootstrap';

import Link from "next/link";

import moment from 'moment';


const Dashboard = ({ show, onClose }) => {
    return (
      <Offcanvas placement="end" show={show} onHide={onClose}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle className={styles.form}>

          </OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          
        </OffcanvasBody>
      </Offcanvas> 
    );
  };
  
  export default BurgerMenu;