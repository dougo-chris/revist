import Head from 'next/head'

import { Container } from '@/components/Container'
import { BriefcaseIcon } from '@/components/Icons'

function getWork() {
  return {
    heading:'Software Engineer & Founder.',
    details: [
      'Experienced software developer with 25+ years building scalable, high-performance' +
        ' applications across diverse technology stacks. Proven expertise in distributed systems,' +
        ' real-time data processing, and full-stack development.',
      ' Strong track record of architecting solutions that handle massive scale (90M+ metrics every 5 minutes) while maintaining reliability and performance.',
      ' Combines deep technical knowledge with leadership experience to deliver robust software solutions.',
    ]
  }
}

function getResume() {
  return [
    {
      company: 'FolioReady',
      title: 'Founder & CEO',
      start: '2025',
      end: 'Present',
    },
    {
      company: 'Telstra',
      title: 'Senior Software Developer',
      start: '2017',
      end: 'Present',
    },
    {
      company: 'Property1View',
      title: 'Technical Lead',
      start: '2015',
      end: '2016',
    },
    {
      company: 'Adyotta',
      title: 'Technical Lead',
      start: '2014',
      end: '2015',
    },
    {
      company: 'Telstra',
      title: 'Technical Lead',
      start: '2014',
      end: '2014',
    },
    {
      company: 'Sensis',
      title: 'Technical Lead',
      start: '2012',
      end: '2014',
    },
  ]
}

function Resume() {
  const resume = getResume();

  return (
    <div className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="flex-none w-6 h-6" />
        <span className="ml-3">Work History</span>
      </h2>
      <ol className="mt-6 space-y-2 divide-y divide-zinc-100">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4 pt-2 first:pt-0">
            <dl className="flex flex-wrap flex-auto gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="flex-none w-full text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start} until ${role.end}`}
              >
                <span>
                  {role.start}
                </span>{' '}
                <span aria-hidden="true">—</span>{' '}
                <span>
                  {role.end}
                </span>
              </dd>
              { role.detail && (
                <>
                  <dt className="sr-only">Detail</dt>
                  <dd className="flex-none w-full ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {role.detail}
                  </dd>
                </>
              )}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Work() {
  const work = getWork();

  return (
    <>
      <Head>
        <title>Work History - Christopher Douglas</title>
        <meta
          name="description"
          content={`Chris Douglas : ${work.heading}`}
        />
      </Head>
      <Container className="mt-8 sm:mt-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
              {work.heading}
            </h1>
            <div className="mt-6 text-base space-y-7 text-zinc-600 dark:text-zinc-400">
              {work.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </div>
          </div>
          <div className="lg:pl-20">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
