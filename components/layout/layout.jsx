import { NaviBarMobile } from "../../components/navibar-mobile/navibar-mobile";
import { NaviBar } from "../../components/navibar/navibar";
import { Footer } from "../../components/footer/footer";
import styles from "./layout.module.scss";
import { HeadCustom } from '../head-custom/head-custom';

import { Mobile, NoMobile } from '../../constants/media-query';

export function Layout({ children, title = 'Хайкинг' }) {
  return (
    <>
      <HeadCustom title={title}/>
      <main className={styles.wrapper}>
          <NoMobile>
            <NaviBar />           
          </NoMobile>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.footer}>        
          <NoMobile>
            <Footer /> 
          </NoMobile>

          <Mobile>
            <NaviBarMobile />
          </Mobile>
        </div>
      </main>
    </>
  )
}