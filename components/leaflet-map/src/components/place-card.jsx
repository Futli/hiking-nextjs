import sideStyles from "./sidebar/sidebar.module.scss";
import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, CardImg } from "react-bootstrap";
import {ImageCustom} from "../../../image-custom/image-custom";
import RouteSvg from '../../../../public/route.svg';
import PlaySvg from '../../../../public/play.svg';
import ShareSvg from '../../../../public/share.svg';

import Link from "next/link";

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

const PlaceCard = ({ placeInfo, otherPlaces, routes }) => {

    const [isCopiedTooltipVisible, setIsCopiedTooltipVisible] = useState(false);

    useEffect(() => {
        if (isCopiedTooltipVisible) {
          setTimeout(() => setIsCopiedTooltipVisible(false), 1800);
        }
      }, [isCopiedTooltipVisible]);

    const handleShare = useCallback(() => {
        navigator.clipboard.writeText(window.location.href );
        setIsCopiedTooltipVisible(true);
    }, []);

    return (
        <div className={sideStyles.overlap}>
            <ImageCustom
                imageId={placeInfo.imageId}
                styles={sideStyles.placeCardImage}
            />
            <div className={sideStyles.containerInfo}>
                <div className={sideStyles.title}>{placeInfo.title}</div>

                <div className={sideStyles.buttonGroup}>
                    <Link href={`places/${placeInfo.id}`}>
                        <a className={sideStyles.mapButton}>
                            <RouteSvg className={sideStyles.icon} width={25} />
                            <span>Место</span>
                        </a>
                    </Link>
                    {placeInfo.youTubeUrl ? 
                        <a className={sideStyles.playButton} href={placeInfo.youTubeUrl}/> : <p className={sideStyles.playButtonNo} />
                        
                    }
                    <button
                        className={sideStyles.shareButton}
                        onClick={handleShare}
                    >
                        <ShareSvg width={25} />
                        <span className={isCopiedTooltipVisible ? `${sideStyles.shareTooltip} ${sideStyles.visible}` : sideStyles.shareTooltip}>
                            Ссылка на страницу скопирована
                        </span>
                    </button>
                </div>

                <div
                    className={sideStyles.description}
                    dangerouslySetInnerHTML={{
                        __html: placeInfo.description,
                    }}
                ></div>

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
                                        src={val.imageId ? (`${BASE_URL}/images/${val.imageId}.jpg`) : `/no-photo.jpg` }
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
                                                src={val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : `/no-photo.jpg`}
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
export default PlaceCard;