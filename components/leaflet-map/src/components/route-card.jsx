import sideStyles from "./sidebar/sidebar.module.scss";
import React, { useEffect, useState,useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { CardImg } from "react-bootstrap";

import {ImageCustom} from "../../../image-custom/image-custom"
import ShareSvg from '../../../../public/share.svg';
import RouteSvg from '../../../../public/route.svg';

import Link from "next/link";
import Chart from '../../../pages/routes/chart';
import { api } from '../../../../services/hiking-service';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

const RouteCard = ({ routeInfo, otherPlaces, routes }) => {
    const [isCopiedTooltipVisible, setIsCopiedTooltipVisible] = useState(false);
    const handleShare = useCallback(() => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopiedTooltipVisible(true);
    }, []);
    useEffect(() => {
        if (isCopiedTooltipVisible) {
          setTimeout(() => setIsCopiedTooltipVisible(false), 1800);
        }
    }, [isCopiedTooltipVisible]);

    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        loadGraph();
      }, [])
    
      const loadGraph = useCallback(() => {
        api.getRouteGraph(routeInfo.id)
          .then((result) => {
            setGraphData(result);
    
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      
    return (
        <div className={sideStyles.overlap}>
            <ImageCustom
                imageId={routeInfo.imageId}
                styles={sideStyles.placeCardImage}
            />
            <div className={sideStyles.containerInfo}>
                <div className={sideStyles.title}>{routeInfo.title}</div>

                <div className={sideStyles.buttonGroup}>
                <Link href={`routes/${routeInfo.id}`}>
                        <a className={sideStyles.mapButton}>
                            <RouteSvg className={sideStyles.icon} width={25} /><span>Маршрут</span>
                        </a>
                    </Link>

                    <button className={sideStyles.playButton} />

                    <button
            className={sideStyles.shareButton}
            onClick={handleShare}
          >
            <ShareSvg width={25} />
            <span
              className={isCopiedTooltipVisible ? `${sideStyles.shareTooltip} ${sideStyles.visible}` : sideStyles.shareTooltip}
            >
              Ссылка на страницу скопирована
            </span>
          </button>
                </div>

                <div
                    className={sideStyles.description}
                    dangerouslySetInnerHTML={{
                        __html: routeInfo.description,
                    }}
                >
                </div>
                <Chart className={sideStyles.chart} data={graphData} />


            </div>


            <section className={sideStyles.routers}>
                <div className={sideStyles.containerInfo}>
                    <h3 className={sideStyles.h3}>Маршруты</h3>
                </div>
                <div className={sideStyles.routersSwiper}>
                    <Swiper
                        slidesPerView={2.5}
                        spaceBetween={12}
                        grabCursor={true}
                    >
                        {routes.map((val, key) => {
                            console.log(val.imageId)
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <SwiperSlide
                                    key={key}
                                    className={sideStyles.routersSlide}
                                >
                                    <CardImg
                                        className={
                                            sideStyles.slideRoutersImg
                                        }
                                        src={ val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : '/no-photo.jpg' }
                                    />
                                    <div className={sideStyles.routersName}>
                                        {val.title}
                                    </div>
                                    <div
                                        className={
                                            sideStyles.routersDistance
                                        }
                                    >
                                        {val.length} км
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </section>

            <section className={sideStyles.otherPlace}>
                <div className={sideStyles.containerInfo}>
                    <h3 className={sideStyles.h3}>Другие места</h3>
                </div>
                <div className={sideStyles.otherPlaceSwiper}>
                    <Swiper
                        slidesPerView={1.25}
                        spaceBetween={8}
                        grabCursor={true}
                    >
                        {otherPlaces.map((val, key) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <SwiperSlide key={key}>
                                    <Link href={`places/${val.id}`} passHref>
                                        <a>
                                            <CardImg
                                                className={sideStyles.otherPlaceImg}
                                                src={val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : "/no-photo.jpg"}
                                            />
                                            <div className={sideStyles.otherPlaceName}>
                                                {val.title}
                                            </div>
                                        </a>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};
export default RouteCard;