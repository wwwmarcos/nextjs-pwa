import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html lang='pt-br'>
        <Head>
          <meta charSet='utf-8' />
          <title>PWA Test</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'
          />
          <meta name='theme-color' content='#446CB3' />
          <link rel='manifest' href='static/manifest.json' />
          <link rel='shortcut icon' href='static/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
