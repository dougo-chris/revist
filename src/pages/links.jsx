import Head from 'next/head'

import { useId } from 'react'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'

import sections from '@/../content/links.yaml'

function Section({ section, children }) {
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
          {section}
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

function ListLink({ link }) {
  const { title, description, href } = link;
  return (
    <div className="flex py-4 group first:pt-0">
      <a class="w-full" href={href} target="_blank">
        <h3 class="text-sm font-base text-gray-800 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400">
          <div>
            <ChevronRightIcon className="inline-block w-4 h-4 stroke-current" />
            <span class="ml-2 font-medium">{title}</span>
          </div>
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

export default function Links() {
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
        <div className="space-y-8">
          {sections.map(({section, links}, sectionId) => (
            <ListSection 
              key={`section_${sectionId}`}
              section={section}
            >
              {links.map((link, linkId) => (
                <ListLink
                  key={`item_${sectionId}-${linkId}`}
                  link={link}
                />
              ))}
            </ListSection>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}
