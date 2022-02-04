import React from "react";
import { CardGroup, Card, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

import { Mobile, NoMobile } from "../../../../constants/media-query";
import { HeaderPage } from "../../../header-page/header-page";
import { Layout } from "../../../layout/layout";
import { BackButton } from "../../../back-button/back-button";

import { usePlaces } from "../../../../hooks/usePlaces";
import styles from "./places.module.scss";
import stylesMob from "./places_mobile.module.scss";

import getConfig from 'next/config';
import { PlacesHeader } from "../places-header/places-header";
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

export const PlacesPage = ({ places: serverPlaces, areas }) => {
  const {
    places,
    totalRows,
    isLoading,
    area,
    loadMore,
    filter,
  } = usePlaces({ serverPlaces })

  // if (!!isLoading) {
  //   return (
  //     <Layout title="Места">
  //       <BackButton name="Места" />
  //       <Spin />
  //     </Layout>
  //   );
  // }

  return (
    <Layout title="Места">
      <NoMobile>
        <div className={styles.backNews} />
        <div className={styles.container}>
          <div className={styles.Title}>
            <HeaderPage title="Места" />
          </div>

          <PlacesHeader areas={areas} area={area} filter={filter} />

          <CardGroup className={styles.cardGroup}>
          
            <Row xs={1} md={2} xl={3}>
              {places.length
                ? places.map((val, key) =>
                  <Col key={val.id} className={styles.col}>
                    <Link href={`/places/${val.id}`} key={key} passHref>
                      <Card className={styles.Card}>
                        <Card.Img
                          className={styles.placesImage}
                          variant="top"
                          key={val.id}
                          src={val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : "/no-photo.jpg"}
                        />
                        <Card.Body className={styles.cardBody}>
                          <Card.Title>{val.title}</Card.Title>
                          <Card.Text className={styles.cardFooter}>
                            <p className={styles.cardText}>{val.area.title}</p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>

                )
                : <h1>Ничего не найдено</h1>
              }
            </Row>
          </CardGroup>
          {Object.keys(places).length < totalRows && (
            <div className={styles.block}>
              <Button
                variant="light"
                className={styles.loadButton}
                onClick={loadMore}
              >
                Показать ещё
              </Button>
            </div>
          )}
        </div>
      </NoMobile>

      <Mobile>
        <BackButton name="Места" />
        <div className={stylesMob.container}>
          <PlacesHeader areas={areas} area={area} filter={filter} />


          <div>
            {places.map((val) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Link
                  href={`/places/${val.id}`}
                  key={val.id}
                  passHref
                >
                  <div className={stylesMob.card}>
                    <Card.Img
                      className={stylesMob.newsImage}
                      key={val.id}
                      src={val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : "/no-photo.jpg"}
                    />
                    <div className={stylesMob.textNewsContainer}>
                      <h3 className={stylesMob.newsTitle}>
                        {" "}
                        {val.title}{" "}
                      </h3>
                      <div className={stylesMob.dateView}>
                        <div className={stylesMob.date}>
                          {" "}
                          {val.area.title}
                          {" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {Object.keys(places).length < totalRows && (
            <div className={styles.block}>
              <Button
                variant="light"
                className={stylesMob.loadButton}
                onClick={loadMore}
              >
                Показать ещё
              </Button>
            </div>
          )}
        </div>
      </Mobile>

    </Layout>
  );
};

