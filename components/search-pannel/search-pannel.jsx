import React from "react";
import styles from "./search-pannel.module.scss";
import Link from "next/link";
import Image from "next/image"
import { useState } from "react";
import BurgerMenu from "../burger-menu/burger-menu";
import { Mobile, NoMobile } from "../../constants/media-query";

const SearchPannel = ({ children }) => {
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  return (
    <>
      <Mobile>
        <form className={styles.searchPannel}>
          {children}
          <img alt="burger" src="burger.svg" onClick={onShow} />
          
          <BurgerMenu show={show} onClose={onClose} />
        </form>
      </Mobile>

      <NoMobile>
        <form className={styles.inputBlock}>
          <Link key="keyNoMobileLink" href={`/`} passHref>
            <div key="keyNoMobile" className={styles.logo} />
          </Link>
          {children}
          <button type="submit" className={styles.searchButton} />{" "}
          {/*Иконка становится крестиком и убирает поисковую выдачу*/}
        </form>
      </NoMobile>
    </>
  );
};

export default SearchPannel;
