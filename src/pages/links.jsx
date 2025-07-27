import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'
import { useId } from 'react'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'
import { getLinksGroupedBy } from '@/lib/getLink'
import { formatDateShort } from '@/lib/formatDate'

function Section({ title, children, groupedBy }) {
  let id = useId()

  return (
    <section
      aria-labelledby={id}
      className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    >
      <div className="grid items-baseline max-w-3xl grid-cols-1 gap-y-4 md:grid-cols-4">
        <h2
          id={id}
          className="text-sm font-semibold text-zinc-800 dark:text-zinc-100"
        >
          {groupedBy === 'date' ? formatDateShort(title) : title}
        </h2>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  )
}

function ListSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="divide-y divide-gray-200">
        {children}
      </ul>
    </Section>
  )
}

function ListItem({ item, groupedBy }) {
  const { title, description, href } = item
  return (
    <div className="flex py-4 group first:pt-0">
      <a class="w-full" href={href} target="_blank">
        <h3 class="flex justify-between text-sm font-base text-gray-800 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400">
          <div>
            <ChevronRightIcon className="inline-block w-4 h-4 stroke-current" />
            <span class="ml-2 font-medium">{title}</span>
          </div>
          <p class="flex text-xs text-right text-gray-800 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400">
            {groupedBy === 'tag' ? formatDateShort(item.date) :  item.tag}
          </p>
        </h3>
        {description && (
          <p class="ml-8 text-xs text-gray-600 dark:text-gray-400">
          { description}
          </p>
        )}
      </a>
    </div>
  )
}

export default function Links({ links, groupedBy }) {
  return (
    <>
      <Head>
        <title>Links - Christopher Douglas</title>
        <meta
          name="description"
          content="Things I've found that are interesting."
        />
      </Head>
      <SimpleLayout>
        <div class="flex justify-center space-x-8">
          <Link
            href="/links/date"
            className={clsx(
              'text-sm font-base',
              groupedBy === 'date'
                ? 'text-teal-500 dark:text-teal-400'
                : 'text-zinc-800 dark:text-zinc-200 hover:text-teal-500 dark:hover:text-teal-400'
            )}
          >
            <ChevronRightIcon className="inline-block w-4 h-4 stroke-current" />
            By Date
          </Link>

          <Link
            href="/links/tag"
            className={clsx(
              'text-sm font-base',
              groupedBy === 'tag'
                ? 'text-teal-500 dark:text-teal-400'
                : 'text-zinc-800 dark:text-zinc-200 hover:text-teal-500 dark:hover:text-teal-400'
            )}
          >
            <ChevronRightIcon className="inline-block w-4 h-4 stroke-current" />
            By Tag
          </Link>
        </div>
        <div className="mt-8 space-y-8">
          {Object.keys(links).map((title, sectionId) => (
            <ListSection title={title}>
              {links[title].map((item, linkId) => (
                <ListItem
                  key={`${sectionId}-${linkId}`}
                  item={item}
                  groupedBy={groupedBy}
                />
              ))}
            </ListSection>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      links: await getLinksGroupedBy('date'),
      groupedBy: 'date',
    },
  }
}