// import styles from "./image.module.scss";

 //import {useState, useEffect} from 'react'
import Image from 'next/image';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;


const IsNull = (props) => {
  if (props.imageId === null) {
     const src = '/no-photo.jpg';
     return src;
  }  else
  return `${BASE_URL}/images/${props.imageId}.jpg`;
  }

export function ImageCustom(props) {
  
  const src = IsNull(props);

  return (

    <img
      className={props.styles}
      src={src}
      alt={props.imageId}
    />
  )
}