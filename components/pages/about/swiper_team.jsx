import React, { useState } from "react";
import styles from "../../../pages/about/about_mobile.module.scss";
import stylespc from "../../../pages/about/about_pc.module.scss";
import { ImageCustom } from "../../image-custom/image-custom";

//swiper 6
// Core modules imports are same as usual
import SwiperCore, { Thumbs } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/swiper-react.cjs.js";

// Styles must use direct files imports

//swiper 7
/* 
import SwiperCore, { Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
 */

SwiperCore.use([Thumbs]);

const SwiperTeam = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const slides = data.map((val, key) => {
    return (
      <SwiperSlide key={key}>
        <div className={stylespc.aboutOurTeam}>
          <ImageCustom
            key={key}
            imageId={val.imageId}
            styles={stylespc.mainPhoto}
          />

          <div className={stylespc.aboutOurTeamText}>
            <h3>{val.title}</h3>
            <p>{val.text}</p>
            <div>{val.description}</div>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  const thumbs = data.map((val, key) => {
    return (
      <SwiperSlide key={key}>
        <div className={stylespc.aboutOurTeam}>
          <ImageCustom
            key={key}
            imageId={val.imageId}
            styles={stylespc.mainPhoto_thumb}
          />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <>
      <Swiper
        id="main"
        spaceBetween={5}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        scrollbar={{ draggable: true }}
      >
        {slides}
      </Swiper>
      <Swiper
        id="thumbs"
        spaceBetween={5}
        slidesPerView={5}
        onSwiper={setThumbsSwiper}
      >
        {thumbs}
      </Swiper>
      
    </>
  );
};

export default SwiperTeam;
