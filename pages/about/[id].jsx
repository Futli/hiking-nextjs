import data from "../../components/pages/about/data";
import { Mobile, NoMobile } from "../../constants/media-query";
import { Layout } from "../../components/layout/layout";
import { BackButton } from "../../components/back-button/back-button";
import { ImageCustom } from "../../components/image-custom/image-custom";
import stylespc from "./about_pc.module.scss";

export default function TeamItem({ teamId }) {
  console.log(data);
  const teamItem = data.filter((value) => value.id == teamId);
  console.log(teamItem);
  return (
    <Layout title="О проекте" className={stylespc.container}>
      <Mobile>
        <BackButton href="/about" name="О проекте" />

        <ImageCustom imageId={teamItem[0].imageId} styles={stylespc.image} />
<div className={stylespc.team__wrapper}>
        <h1>{teamItem[0].title}</h1>
        <small>{teamItem[0].text}</small>

        <p>{teamItem[0].description}</p></div>
      </Mobile>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const teamId = params.id;
  return {
    props: { teamId },
  };
}


