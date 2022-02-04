import { Layout } from "../../../../components/layout/layout";
//import { api } from '../../../services/hiking-service';
import { BackButton } from "../../../../components/back-button/back-button";

// import { Pannellum } from "@georgedrpg/pannellum-react-next";
import "@georgedrpg/pannellum-react-next/es/css/video-js.css";
import "@georgedrpg/pannellum-react-next/es/css/pannellum.css";
import "@georgedrpg/pannellum-react-next/es/css/style-textInfo.css";

import dynamic from 'next/dynamic';
import React from "react";
import { NoMobile } from "../../../../constants/media-query";
// import ReactPannellum, { getConfig } from "react-pannellum";

const Pan = dynamic(
  () => {
    return import("@georgedrpg/pannellum-react-next/es/elements/Pannellum");
  },
  { ssr: false }
)

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

export default function Panorama({ params }) {
  return (
    <Layout>
      <NoMobile>
      <BackButton name="Назад" href={`/places/${params.id}`} />
      </NoMobile>
      <Pan
        width="100%"
        height="100vh"
        image={`${BASE_URL}/images360/${params.image360Id}.jpg`}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
        onLoad={() => {
        console.log("panorama loaded");
        }}
      >
      </Pan>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}
