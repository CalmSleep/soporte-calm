import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="es-AR">
        <Head>
         {/*  <link rel="preload" href="/fonts/Gilroy-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
          <link rel="preload" href="/fonts/Gilroy-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
          <link rel="preload" href="/fonts/Gilroy-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
          <link rel="preload" href="/fonts/Gilroy-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
          <link rel="preload" href="/fonts/Gilroy-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link> */}
          
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />


          <link rel="preconnect" href="https://imagedelivery.net" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://imagedelivery.net" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
