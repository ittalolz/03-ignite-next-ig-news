import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Header } from "../components/Header"

import '../styles/global.scss'
import { PrismicProvider } from "@prismicio/react"
import { linkResolver, repositoryName } from "../services/prismicio"
import Link from "next/link"
import { PrismicPreview } from "@prismicio/next"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Header />
      <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>
            {children}
          </a>
        </Link>
      )}
    >      
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
    </SessionProvider>
  )
}

export default MyApp
