import React, { useState, useMemo } from "react";
import { Card, Form } from "react-bootstrap";
import dynamic from "next/dynamic";
import SwiperTeam from "../../components/pages/about/swiper_team";
import { Layout } from "../../components/layout/layout";
import { BackButton } from "../../components/back-button/back-button";
import { CarouselCustom } from "../../components/carousel-custom/carousel-custom";
import { Mobile, NoMobile } from "../../constants/media-query";
import { ImageCustom } from "../../components/image-custom/image-custom";
import styles from "./about_mobile.module.scss";
import stylespc from "./about_pc.module.scss";
import data from "../../components/pages/about/data";
import Iframe from 'react-iframe'

        
/* 
const SwiperTeam = dynamic(
    () => {
      return import("./swiper_team")
    },
    { ssr: false }
  ); */
/*  
/* if (typeof window !== "undefined") {
      import('./Map2')
} */

export default function About() {
  return (
    <>
      <Layout title="О проекте" className={stylespc.container}>
        <NoMobile>
          <div className={stylespc.back} />

          <div className={stylespc.container}>
            <div className={stylespc.nav}>Главная / О проекте</div>
            <h1 className={stylespc.title}>О проекте</h1>

            <div className={stylespc.aboutBlock}>
              <div className={stylespc.aboutTextBlock}>
                «Красноярский хайкинг» - это сеть промаркированных троп, которые
                начинаются в пригородной черте и идут далеко за город
              </div>
            </div>

            <div className={stylespc.textImageContainer}>
              <div className={stylespc.contentContainer}>
                <div>
                  <div className={stylespc.textNature}>
                    Хайкинг – (от английского «hike»), это прогулка или пешее
                    путешествие, как правило, по горной или лесной местности,
                    чаще всего проходящее по подготовленным маршрутам. В связи с
                    тем, что этот вид активного отдыха доступен практически
                    любому относительно здоровому человеку, требует минимум
                    затрат и доступен в любое время года, он получил широкое
                    распространение во многих странах мира.
                  </div>
                  <div className={stylespc.image_1} />
                </div>
                <div>
                  {" "}
                  <div className={stylespc.image_2} />
                  <div className={stylespc.textNature}>
                    «Красноярский хайкинг» - это сеть промаркированных троп,
                    которые начинаются в пригородной черте и идут далеко за
                    город. Кроме того, мы прокладываем маршруты не только вблизи
                    от города, но и в других интересных районах, по всему
                    Красноярскому краю, а в перспективе и за его пределами.
                    Маршруты хайкинга проложены таким образом, чтобы путешествуя
                    по ним, человек получил максимальное представление о природе
                    Сибири, посетил как можно больше интересных мест.
                  </div>
                </div>

                <div>
                  <div className={stylespc.textNature}>
                    Красноярский хайкинг открывает новые возможности для горожан
                    самостоятельно посещать новые интересные районы, активно
                    проводить свободное время, дышать свежим воздухом, узнавать
                    окрестности города. В настоящий момент разработано более 400
                    км троп, из них около 300 км промаркировано. Маршруты разные
                    по содержанию и сложности, поэтому рассчитаны на разные
                    категории путешественников.
                  </div>
                  <div className={stylespc.image_3} />
                </div>
              </div>
            </div>
          </div>
          <div className={stylespc.ourTeamBack}>
            <div className={stylespc.containerOurTeam}>
              <h2 className={stylespc.ourTeamTitle}>Наша команда</h2>
              <SwiperTeam data={data} />
            </div>
          </div>
          <div className={stylespc.container}>
            <div className={stylespc.contactContainer}>
              <div className={stylespc.contact}>
                <div className={stylespc.ourContact}>
                  <h3>Контакты</h3>
                  <div className={stylespc.border} />
                  <div className={stylespc.contactDataContainer}>
                    <div className={stylespc.contactItem}>
                      <div className={stylespc.phone} />
                      <a
                        href="tel:+7 (391) 227‒92‒01"
                        className={stylespc.Text}
                      >
                        +7 (391) 227‒92‒01
                      </a>
                    </div>

                    <div className={stylespc.contactItem}>
                      <div className={stylespc.point} />
                      <div className={stylespc.Text}>ул. ​Карла Маркса, 49</div>
                    </div>

                    <div className={stylespc.contactItem}>
                      <div className={stylespc.mail} />
                      <a
                        href="mailto:krashiking@gmail.com"
                        className={stylespc.Text}
                      >
                        krashiking@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className={stylespc.feedback}>
                  <form>
                    <h3>Обратная связь</h3>
                    <div className={stylespc.border} />
                    <input type="text" required placeholder="Имя" />
                    <input
                      type="email"
                      required
                      placeholder="Адрес электронной почты"
                    />
                    <textarea placeholder="Ваше сообщение" />
                    <button> Отправить </button>
                  </form>
                </div>
              </div>

              
                
                <Iframe url="https://yandex.ru/map-widget/v1/-/CCU5IMvbxC"
        width="100%"
        height="736px"
        position="relative"/>
           
            </div>
          </div>
        </NoMobile>

        <Mobile>
          <BackButton name="О проекте" />
          <h1 className={styles.title}>Красноярский хайкинг</h1>
          <Card className={styles.card}>
            <ImageCustom imageId={"main/about"} styles={styles.newsImage} />

            <Card.Text className={styles.aboutText}>
              Красноярский хайкинг открывает новые возможности для горожан
              самостоятельно посещать новые интересные районы, активно проводить
              свободное время, дышать свежим воздухом, узнавать окрестности
              города. В настоящий момент разработано более 400 км троп, из них
              около 300 км промаркировано. Маршруты разные по содержанию и
              сложности, поэтому рассчитаны на разные категории
              путешественников.
              <br />
              Ходите, гуляйте, путешествуйте, что бы природа зря не простаивала!
            </Card.Text>
          </Card>

          <CarouselCustom
            className={styles.slider}
            title="Наша команда"
            data={data}
            type="about"
          />
   
          {/*  <div
            id="map"
            style={{ marginTop: "1rem", width: "100%", height: 350 }}
          ></div> */}
        </Mobile>
      </Layout>
    </>
  );
}
