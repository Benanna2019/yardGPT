import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    let description = 'Generate your dream yard/garden in seconds.'
    let ogimage = 'https://www.yardgpt.design/og-image.png'
    let sitename = 'yardPT.design'
    let title = 'Dream Yard/Garden Generator'

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content={description} />
          <meta property="og:site_name" content={sitename} />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta property="og:image" content={ogimage} />
          <meta name="twitter:image" content={ogimage} />
        </Head>
        <body className="bg-slate-50 text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
