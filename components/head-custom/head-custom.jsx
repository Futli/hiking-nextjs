import Head from 'next/head';

export function HeadCustom({ children, title = 'Хайкинг' }) {
  return (
    <>
      <Head>
        
        <title>Хайкинг.рф | {title}</title>
        <meta name="keywords" content="хайкинг,столбы,красноярск" />
        <meta name="description" content="описание для seo" />
        <meta charSet="utf-8" />
        
        {/* Yandex.Metrika counter */}
        {/* <script type="text/javascript">
          (function (d, w, c) {
              (w[c] = w[c] || []).push(function() {
                  try {
                      w.yaCounter31493383 = new Ya.Metrika({
                          id:31493383,
                          clickmap:true,
                          trackLinks:true,
                          accurateTrackBounce:true
                      });
                  } catch(e) { }
              });

              var n = d.getElementsByTagName("script")[0],
                  s = d.createElement("script"),
                  f = function () { n.parentNode.insertBefore(s, n); };
              s.type = "text/javascript";
              s.async = true;
              s.src = "https://mc.yandex.ru/metrika/watch.js";

              if (w.opera == "[object Opera]") {
                  d.addEventListener("DOMContentLoaded", f, false);
              } else { f(); }
          })(document, window, "yandex_metrika_callbacks");
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/31493383" style="position:absolute; left:-9999px;" alt="" /></div></noscript> */}
        {/* <!-- /Yandex.Metrika counter --> */}
      </Head>
    </>
  )
}