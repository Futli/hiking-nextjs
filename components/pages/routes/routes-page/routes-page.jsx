import React from "react";
import { CardGroup, Card, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

import { Mobile, NoMobile } from "../../../../constants/media-query";
import { HeaderPage } from "../../../header-page/header-page";
import { Layout } from "../../../layout/layout";
import { BackButton } from "../../../back-button/back-button";

import { useRoutes } from "../../../../hooks/useRoutes";
import styles from "./routes.module.scss";
import stylesMob from "./routes_mobile.module.scss";

import getConfig from 'next/config';
import { RoutesHeader } from "../routes-header/routes-header";
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

export const RoutesPage = ({ routes: serverRoutes, areas }) => {
  const {
    routes,
    totalRows,
    isLoading,
    area,
    loadMore,
    filter,
  } = useRoutes({ serverRoutes });

  // if (!!isLoading) {
  //   return (
  //     <Layout title="Места">
  //       <BackButton name="Места" />
  //       <Spin />
  //     </Layout>
  //   );
  // }
  if (Object.keys(routes).length < 1) {
    return (
        <Layout title="Маршруты">
            <NoMobile>
              <div className={styles.container}>
                <div className={styles.newsHeaderEror}>
                <RoutesHeader areas={areas} area={area} filter={filter}/>
                </div>
                <h1>Ничего не найдено</h1>
              </div>
            </NoMobile>

            <Mobile>
           
                <BackButton name="Маршруты" />
                <div className={stylesMob.container}>
                <RoutesHeader areas={areas} area={area} filter={filter}/>
                <h1>Ничего не найдено</h1>
                </div>
            </Mobile>
        </Layout>
    );
};
  return (
    <Layout title="Маршруты">
    <NoMobile>
        <div className={styles.backRoutes} />
        <div className={styles.container}>
            <div className={styles.Title}>
                <HeaderPage title="Маршруты" />
            </div>

            <RoutesHeader areas={areas} area={area} filter={filter}/>

            <CardGroup className={styles.cardGroup}>
                <Row xs={1} md={2} xl={3}>
                    {routes.map((val, key) => {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <Col key={key} className={styles.col}>
                                <Link
                                    href={`/routes/${val.id}`}
                                    key={key}
                                    passHref
                                >
                                    <Card className={styles.Card}>
                                        
                                        {val.imageId ? 
                                        <Card.Img
                                            className={styles.newsImage}
                                            variant="top"
                                            key={val.id}
                                            src={`${BASE_URL}/images/${val.imageId}.jpg`}
                                        /> : <div className={styles.noFoto}/>
                                    }

                                        <Card.Body
                                            className={styles.cardBody}
                                        >
                                            <Card.Title>
                                                {val.title}
                                            </Card.Title>
                                            <Card.Text
                                                className={
                                                    styles.cardFooter
                                                }
                                            >
                                                <p
                                                    className={
                                                        styles.views
                                                    }
                                                >
                                                    {val.area.title}
                                                </p>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </CardGroup>
            {Object.keys(routes).length < totalRows && (
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
        <BackButton name="Маршруты" />
        <div className={stylesMob.container}>
            <RoutesHeader areas={areas} area={area} filter={filter} />

            <div>
                {routes.map((val, key) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <Link
                            href={`/routes/${val.id}`}
                            key={key}
                            passHref
                        >
                            <div className={stylesMob.card}>
                                <Card.Img
                                    className={stylesMob.newsImage}
                                    key={val.id}
                                    src={val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : 'no-photo.jpg'}
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

            {Object.keys(routes).length < totalRows && (
                <div className={stylesMob.moreButton}>
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
    </Mobile>
</Layout>
  );
};

