import { GetStaticProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { createClient } from "../../services/prismicio";
import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string,
  excerpt: string;
  updateAt: string
}


interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>          
          { posts.map( post => (
            <a href="#" key={post.slug}>
              <time>{post.updateAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          )) }
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = createClient({ previewData });  

  const response = await prismic.getByType('post', {
    fetch: ['posts.title', 'posts.content'],
    pageSize: 100,
  });

  //console.log(JSON.stringify(response, null, 2));

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.Title),
      excerpt: post.data.Content.find(Content => Content.type === 'paragraph')?.text ?? '',
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: { posts }
  }
}

