import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { Category } from '@/payload-types'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params: paramsPromise, searchParams }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const q = await searchParams

  // Access query params directly from searchParams
  const categorySlug = typeof q?.category === 'string' ? q.category : undefined
  const page = typeof q?.page === 'string' ? parseInt(q.page, 10) || 1 : 1

  // Fetch categories
  const categoriesResult = await payload.find({
    collection: 'project-categories',
    depth: 0,
    limit: 50, // Adjust as needed
    overrideAccess: false,
  })

  const categories = categoriesResult.docs as Category[]

  // Find category ID from slug if provided
  const category = categorySlug ? categories.find((cat) => cat.slug === categorySlug) : undefined

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    sort: '-publishedAt',
    page: sanitizedPageNumber,
    overrideAccess: false,
    where:
      categorySlug && category
        ? {
            categories: {
              equals: category.id, // Still use ID internally for Payload query
            },
          }
        : undefined,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Projects</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="projects"
          currentPage={projects.page}
          limit={12}
          totalDocs={projects.totalDocs}
        />
      </div>

      <CollectionArchive posts={projects.docs} relationTo="projects" />

      <div className="container">
        {projects?.page && projects?.totalPages > 1 && (
          <Pagination page={projects.page} totalPages={projects.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `John Phung | Projects ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'projects',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
