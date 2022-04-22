import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { RichText } from "prismic-dom"
import { createClient } from "../../services/prismicio"

import styles from './post.module.scss'


interface PostProps {
  post: {
    slug: string;
    title: string,
    content: string;
    updateAt: string
  }
}

export default function Post({ post } : PostProps){
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{__html: post.content}} 
          />
        </article>
      </main>
    </>    
  )
}

export const getServerSideProps: GetServerSideProps =async ({ req, params, previewData }) => {
  const session = await getSession({ req })

  if (!session.activeSubscription) {
    console.log('post parcial')
  }

  const { slug } = params;

  const prismic = createClient({ previewData })  

  const response = await prismic.getByUID('post', String(slug), {})  

  const post = {
    slug,
    title: RichText.asText(response.data.Title),
    content: RichText.asHtml(response.data.Content),
    updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: { post }
  }
}