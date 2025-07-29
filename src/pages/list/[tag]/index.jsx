import List from '@/pages/list'

import sections from 'content/lists.yaml'

export default function ListTag({ links, tag }) {
  return (
    <>
      <List links={links} tag={tag} />
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: sections.map(section => ({ params: { tag: section.tag } })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { tag } = params;
  const { links } = await import(`content/lists/${tag}.yaml`);

  return {
    props: {
      links: links,
      tag: tag,
    },
  }
}
