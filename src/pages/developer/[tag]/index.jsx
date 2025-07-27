import { getContents } from '@/lib/getContent'
import Developer from '@/pages/developer'

import { tags } from '@/./../content/tags.yaml'

export default function Page({ tag, contents }) {
  return (
    <>
      <Developer tag={tag} contents={contents} />
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: tags.map(tag => ({ params: { tag: tag.tag } })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { tag } = params;
  const contents = await getContents('developer');
  return {
    props: {
      tag: tag,
      contents: contents.filter(content => content.tag == tag),
    },
  }
}
