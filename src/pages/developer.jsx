import Head from 'next/head'
import { formatDate } from '@/lib/formatDate'
import { getContents } from '@/lib/getContent'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'
import { Card } from '@/components/Card'

import { tags } from '@/./../content/tags.yaml'

function MenuItem({ tag, title, selected }) {
  return (
    <a
      href={tag ? `/developer/${tag}` : '/developer'}
      aria-selected={tag == selected ? 'true' : 'false'}
      class="flex w-full p-2 rounded items-center
      text-base font-base tracking-tight
      dark:text-gray-100
      aria-selected:bg-gray-200 aria-selected:dark:bg-gray-800
      aria-selected:text-teal-500 aria-selected:dark:text-teal-400"
    >
      {title}
    </a>
  );
}

function Content({ content }) {
  return (
    <article class="group py-2 first:pt-0">
      <a href={`/developer/${content.tag}/${content.slug}`}>
        <h3 class="text-sm font-semibold text-gray-800 dark:text-white flex justify-between group-hover:text-teal-500 dark:group-hover:text-teal-400">
          <span class="ml-2">
            <ChevronRightIcon className="inline-block w-5 h-5 stroke-current" />
            {content.title}
          </span>
          <span class="ml-4 text-xs text-gray-500 group-hover:text-teal-500 dark:group-hover:text-teal-400">
            {formatDate(content.date)}
          </span>
        </h3>
        <p class="ml-8 mt-0.5 text-sm text-gray-600 dark:text-gray-400">
          {content.description}
        </p>
      </a>
    </article>
 );
}

export default function Developer({ contents, tag = null }) {
  return (
    <>
      <Head>
        <title>Developer - Christopher Douglas</title>
        <meta
          name="description"
          content="Developer Tools & Techniques"
        />
      </Head>
      <SimpleLayout>
        <div class="mt-8 flex flex-wrap md:flex-nowrap">
          <div class="h-full w-full md:w-[20rem] md:mr-8 md:sticky md:top-32 rounded">
            <MenuItem
              key='everything'
              tag={null}
              title="Everything"
              selected={tag}
            />

            {tags.map((item) => (
              <MenuItem
                key={item.tag}
                tag={item.tag}
                title={item.title}
                selected={tag}
              />
            ))}
          </div>
          <div class="mt-8 md:mt-0 w-full divide-y divide-gray-200">
            {contents.map((content) => (
              <Content
                key={content.slug}
                content={content}
              />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      contents: await getContents('developer'),
    },
  }
}