import Links from '@/pages/links'
import { getLinksGroupedBy } from '@/lib/getLink'

export default function LinkDate({ links }) {
  return (
    <Links links={links} groupedBy="tag"/>
  )
}

export async function getStaticProps() {
  return {
    props: {
      links: await getLinksGroupedBy('tag'),
    },
  }
}