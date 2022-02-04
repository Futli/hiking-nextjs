import React, { Component } from "react";
import { useState, useEffect } from "react";
import styles from "./sidebar-header.module.scss";

import Link from "next/link";
import { Form } from "react-bootstrap";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/swiper-react.cjs.js";
import EventCard from "../pages/events/event-card";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;
import moment from "moment";
import 'moment/locale/ru';

const SidebarHeader = ({ selectedAreaId,  onPlaceType, onSelectedAreaId, placeTypes, events, areas}) => {
    // const [areaId, setAreaId] = useState(0);
    const [activeType, setActiveType] = useState();

    

    const onHandlePlaceType = (type) => {
          onPlaceType(type);
          setActiveType(type);
    };
   

    return (
        <div className={styles.sideContent}>
            <div className={styles.searchBackground}>
                <div className={styles.inputSelectContainer}>
                    <div className={styles.inputBlock} />
                    <Form.Select
                        className={styles.select}
                        value={selectedAreaId || ""}
                        onChange={e => {
                            if (e.target.value != 0){
                                onSelectedAreaId(e.target.value);                                
                            }
                        }}
                    >
                        <option key={0} value={1}>
                            Все районы
                        </option>
                        {areas.map((val, key) => {
                           return (
                                <option key={key} value={val.id} >
                                    {val.title}
                                </option>
                            );
                        })}
                    </Form.Select>
                </div>
            </div>
            {/* <div className={styles.backHeaderBlock}> */}
                <section className={styles.pointOnMap}>
                    <div className={styles.containerButton}>
                        {placeTypes.map((val, key) => {
                            return (
                                <div key={key} className={styles.pointButton} onClick={() => {
                                    console.log("type",val.id) 
                                onHandlePlaceType(val.id)}}>                                    
                                   <img src={`MarkerIcons/${val.id}.png`} className={!(Number(val.id) === Number(activeType)) ? styles.image : styles.imageActive} alt=""/>
                                    <div className={styles.name}>{val.title}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className={styles.event}>
                    <div className={styles.eventContainer}>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={24}
                            slidesPerView={1}
                            navigation
                        > 
                            {events.map((val, key) => {
                                console.log(val.dateStart)
                                return (
                                    <SwiperSlide key={key}>
                                       <EventCard val={val} key={key}/>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </section>

                <section className={styles.ourLink}>
                    <div className={styles.linkContainer}>
                        <div className={styles.appLink}>
                            <Link passHref
                                href={`https://play.google.com/store/apps/details?id=ru.monitorsoft.krashiking&hl=ru`}
                            >
                                <div className={styles.googlePlay} />
                            </Link>
                            <Link passHref
                                href={`https://apps.apple.com/ru/app/%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%8F%D1%80%D1%81%D0%BA%D0%B8%D0%B9-%D1%85%D0%B0%D0%B9%D0%BA%D0%B8%D0%BD%D0%B3/id1084752972`}
                            >
                                <div className={styles.appStore} />
                            </Link>
                        </div>
                        <div className={styles.ourSocial}>
                            <Link passHref href={`https://vk.com/krashiking`}>
                                <div className={styles.vk} />
                            </Link>
                            <Link passHref
                                href={`https://ru-ru.facebook.com/krashiking/?ref=page_internal`}
                            >
                                <div className={styles.fb} />
                            </Link>
                            <Link passHref
                                href={`https://www.instagram.com/krashiking/?hl=ru`}
                            >
                                <div className={styles.inst} />
                            </Link>
                            <Link passHref href={`https://www.tiktok.com/@krashiking?`}>
                                <div className={styles.tt} />
                            </Link>
                            <Link passHref href={`https://t.me/krashiking`}>
                                <div className={styles.tg} />
                            </Link>
                            <Link passHref
                                href={`https://www.youtube.com/channel/UC4DpovlN05jNB5AS-nCLN2w`}
                            >
                                <div className={styles.yt} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        // </div>
    );
};

export default SidebarHeader;
