import styles from "./back-button.module.scss";
import Link from 'next/link';

import { Mobile } from '../../constants/media-query';


export function BackButton(props) {
  
    return (
      <>
        <Mobile>
          <Link href = {props.href || "/"} passHref>
            <a className={styles.home}>
              <div className={styles.backHeader}>
                <p className={styles.title}>{props.name}</p>    
              </div>
            </a>
          </Link>
        </Mobile>
      </>
    )
}