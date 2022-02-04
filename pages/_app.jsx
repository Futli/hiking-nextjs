import '../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../components/leaflet-map/src/components/leaflet-ruler.css";
import 'swiper/swiper.scss'; // core Swiper
import "../pages/about/map.css" //styles 2gis widget
import NextNProgress from 'nextjs-progressbar';
import Router from "next/router";
import withYM from "next-ym";


function MyApp({ Component, pageProps }) {
 
  return (
    <>
      <NextNProgress
      options = {{ showSpinner: false }}
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
     
       <style jsx global>{`
      a{
        text-decoration:none;
      }
      `}
      </style> 
    </>
  )
}
export default withYM("31493383", Router)(MyApp);