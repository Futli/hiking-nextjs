import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"true"}
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet/dist/leaflet.css"
          />

          <link
            rel="stylesheet"
            href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
          />

          <Script
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
          />

          <Script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></Script>
          {/* <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script> */}
          <Script
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css"
          />
          <Script src="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js"></Script>

          <Script rel="preconnect" href="https://fonts.googleapis.com"></Script>
          <Script
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"true"}
          ></Script>
          <Script
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
            rel="stylesheet"
          ></Script>
          <Script
            rel="stylesheet"
            href="https://unpkg.com/leaflet/dist/leaflet.css"
          />
          <Script
            rel="stylesheet"
            href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
