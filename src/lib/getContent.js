import fs from 'fs';
import matter from 'gray-matter';
import glob from 'fast-glob'
import * as path from 'path'

async function getContentMeta(type, filename) {
  const basePath = path.join(process.cwd(), `./content/${type}/${filename}`)
  const fileContent = fs.readFileSync(basePath, 'utf8');
  const matterResult = matter(fileContent);
  const slug = filename.replace(/\.md$/, '')

  return {
    title: matterResult.data.title || slug,
    date: matterResult.data.date || '2020-01-01',
    description: matterResult.data.description || slug,
    tag: matterResult.data.tag || 'general',
    type: type,
    slug: slug,
  }
}

export async function getContents(type) {
  let filenames = await glob(['*.md'], {
    cwd: path.join(process.cwd(), `./content/${type}`),
  })

  let contents = await Promise.all(filenames.map((filename) => getContentMeta(type, filename)))

  return contents.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getAllContents() {
  let filenames = await glob(['**/*.md'], {
    cwd: path.join(process.cwd(), `./content`),
  })

  let contents = await Promise.all(filenames.map((filename) => {
    const [type, basename] = filename.split('/');
    return getContentMeta(type, basename)
  }))

  return contents.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getContent(type, slug) {
  const basePath = path.join(process.cwd(), `./content/${type}/${slug}.md`)
  const fileContent = fs.readFileSync(basePath, 'utf8');
  const matterResult = matter(fileContent);

  return {
    title: matterResult.data.title || slug,
    date: matterResult.data.date || '2020-01-01',
    description: matterResult.data.description || '',
    tag: matterResult.data.tag || 'general',
    type: type,
    slug: slug,
    content: matterResult.content,
  }
}
