import {useState, useEffect} from 'react'

import { Layout } from "../../components/layout/layout"
import { ListGroup, Image } from 'react-bootstrap'
import { BackButton } from "../../components/back-button/back-button"
import Link from "next/link";
import styles from "./select-area.module.scss";

import { api } from '../../services/hiking-service';

const SelectArea = ({ areas: serverAreas  }) => {  
  const [areas, setAreas] = useState(serverAreas);

  if (!areas) {
    return <Layout>
      <p>Loading ...</p>
    </Layout>
  };

  return (
      <Layout>
        <BackButton name="Выберите район"/>
        <ListGroup>
        {areas.map((val, key) => {
          return (
            // eslint-disable-next-line react/jsx-key
            // TODO сохранять выбор в глобальный стейт 
            <Link key={key} href={`/?type=area&id=${val.id}`} passHref>
              <ListGroup.Item action key={key} >
                <div className={styles.container}>
                  <Image alt="vector" src="vector.svg" rounded />
                  <p className={styles.title}>
                    {val.title}
                  </p>
                  <Image alt="array" src="go-arrow.svg" rounded className={styles.image} />
                </div>
              </ListGroup.Item></Link>
          );
        })}
        </ListGroup>

      </Layout>
  )
};

export default SelectArea;


export async function getStaticProps(context) {
  const areas = await api.getAreas();

  return {
   props: { areas },
  };
};
