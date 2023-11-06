import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200&display=swap" rel="stylesheet" />
          </Head>
          <body className="font-['Sora'] leading-7 scroll-smooth">
            <Main />
            <NextScript />
          </body>
        </Html>
        )
}
