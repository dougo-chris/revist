import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'

import sections from '@/../content/lists.yaml'

function MenuItem({ tag, title, selected }) {
  return (
    <a
      href={`/list/${tag}`}
      aria-selected={selected ? 'true' : 'false'}
      class="flex w-full p-1
      text-sm font-base tracking-tight
      dark:text-gray-100
      aria-selected:text-teal-500 aria-selected:dark:text-teal-400"
    >
      <ChevronRightIcon className="inline-block w-5 h-5 stroke-current" />
      {title}
    </a>
  );
}

function Content({ content }) {
  return (
    <article class="group">
      <a href={content.href}>
        <div class="py-2 grid grid-cols-10 group-hover:bg-gray-50 dark:group-hover:bg-zinc-800">
          <div class="col-span-10 lg:col-span-3 text-sm font-semibold text-gray-800 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400">
            <ChevronRightIcon className="inline-block w-5 h-5 stroke-current" />
            {content.title}
          </div>
          <div class="col-span-9 col-start-2 lg:col-span-7 lg:col-start-0 text-xs text-gray-600 dark:text-gray-400">
            {content.description}
          </div>
        </div>
      </a>
    </article>
 );
}

export default function List({ links, tag }) {
  return (
    <>
      <Head>
        <title>Developer - Christopher Douglas</title>
        <meta
          name="description"
          content="List of things I use and recommend."
        />
      </Head>
      <SimpleLayout>
        <div class="mt-8 flex flex-wrap md:flex-nowrap">
          <div class="h-full w-full md:w-[12rem] md:mr-8 md:sticky md:top-32 border-l border-zinc-100 md:pl-3 dark:border-zinc-700">
            {sections.map((section) => (
              <MenuItem
                key={section.tag}
                tag={section.tag}
                title={section.title}
                selected={section.tag == tag}
              />
            ))}
          </div>
          <div class="mt-8 md:-mt-2 w-full divide-y divide-gray-200">
            {links.map((content) => (
              <Content
                key={content.tag}
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
      links: sections[0].links,
      tag: sections[0].tag,
    },
  }
}