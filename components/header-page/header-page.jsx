import { Carousel } from "react-bootstrap";
import styles from "./header-page.module.scss";


export function HeaderPage({ title }) {
  return (
    <div className={styles.wrapper}>
      
          <div className={styles.breadcrumbs}>    
            <p>{`Главная / ${title}`}</p>
            <h3>{title}</h3>
          </div>

        {/* <Carousel controls={false} indicators={true} className={styles.carousel}>   
            <Carousel.Item>
            <img 
                className={styles.image}
                alt="news-header.jpg"
                src="/news-header.jpg"  
            />
            </Carousel.Item>
            <Carousel.Item>
            <img 
                className={styles.image}
                alt="news-header.jpg"
                src="/news-header.jpg"
            /></Carousel.Item>
            <Carousel.Item>
            <img 
                className={styles.image}
                alt="news-header.jpg"
                src="/news-header.jpg"
            />
            
          </Carousel.Item>
        </Carousel> */}
    </div>
  )
}