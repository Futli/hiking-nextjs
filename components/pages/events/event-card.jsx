import React from "react"
import styles from "./eventCard.module.scss"
import getConfig from 'next/config';
import moment from "moment";
const { publicRuntimeConfig } = getConfig();
const FORMAT = "YYYY-MM-DD";
import 'moment/locale/ru'; 
const { BASE_URL } = publicRuntimeConfig;

export default function EventCard({val, key}){

    return (


        
      <div key={key} className={styles.cardEvents}>
        <img className={styles.eventImg} src={val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : "/no-photo.jpg"}/>

        <div className={styles.eventInfoBlock}>
        <div className={styles.eventDateTime}>
             {(val.dateStart != "2021-01-01T00:00:00") ? moment(val.dateStart).locale('ru').format( "DD MMMM / hh:mm") : "Каждую среду / 19:30"}
        </div>
        <div className={styles.eventName}>
            {val.title}
        </div>
        <a target="_blank" rel="noopener noreferrer" href={val.linkForRecord}>
          <button className={styles.eventButton}>
              Регистрация
          </button>
        </a>
        </div>
      </div>
    );
  }