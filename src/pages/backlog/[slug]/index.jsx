import ReactMarkdown from 'react-markdown';

import { ArticleLayout } from '@/components/ArticleLayout'
import { getContents, getContent } from '@/lib/getContent'

export default function BacklogSlug({ content, previousPathname }) {
  return (
    <>
      <ArticleLayout
        meta={{
          title: content.title,
          description: content.description,
          date: content.date,
        }}
        previousPathname={previousPathname}
      >
        <ReactMarkdown>
          {content.content}
        </ReactMarkdown>
      </ArticleLayout>
    </>
  )
}

export const getStaticPaths = async () => {
	const contents = await getContents('_backlog');
  return {
    paths: contents.map(content => ({ params: { slug: content.slug } })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  const content = await getContent('_backlog', slug);

  return {
    props: {
      content: content,
    },
  }
}