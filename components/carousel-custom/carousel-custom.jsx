import styles from "./carousel-custom.module.scss";
import Link from 'next/link';
import { Card, Col} from 'react-bootstrap';
import { ImageCustom } from "../../components/image-custom/image-custom";


export function CarouselCustom(props) {

  if (props.data == null) {
    return (
      <></>
    );
  };

  return (
    <div className={props.className}>
      <h2 className={styles.title}>{props.title}</h2>
      <p className={styles.description}>{props.description || ''}</p>
      <div className={styles.container}>
        <div className={styles.items}>
          {props.data.map((val, key) => (
            <Col 
              className={props.wideCards ? `${styles.column} ${styles.wide}` : styles.column}
              key={`${val.imageId}-${key}`}
            >
              <Link href={`/${props.type}/${val.id}`}>
                <a className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <ImageCustom 
                      imageId={val.imageId}
                      styles={styles.image}
                    />
                  </div>
                    
                  <Card.Title as="p" className={styles.ourTeamName}>
                    {val.title}
                  </Card.Title>
                  {val.text && (
                    <Card.Text className={styles.ourTeamPost}>
                      {val.text}
                    </Card.Text>
                  )} 
                </a>
              </Link>
            </Col>
          ))}
        </div>
      </div>
    </div>
  )
}