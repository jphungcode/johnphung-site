import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { Separator } from '@/components/ui/separator'
import CategoryFilter from '@/components/CategoryFilter'
import { Category } from '@/payload-types'

//export const dynamic = 'force-static'
export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const q = await searchParams

  // Access query params directly from searchParams
  const categorySlug = typeof q?.category === 'string' ? q.category : undefined
  const page = typeof q?.page === 'string' ? parseInt(q.page, 10) || 1 : 1
  const payload = await getPayload({ config: configPromise })

  // Fetch categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 20, // Adjust as needed
    overrideAccess: false,
  })

  const categories = categoriesResult.docs as Category[]

  // Find category ID from slug if provided
  const category = categorySlug ? categories.find((cat) => cat.slug === categorySlug) : undefined

  // Fetch posts with category filter based on slug
  const posts = await payload.find({
    collection: 'posts',
    depth: 1, // Ensure categories are populated
    limit: 12,
    page: page,
    sort: '-publishedAt',
    overrideAccess: false,
    where:
      categorySlug && category
        ? {
            categories: {
              equals: category.id, // Still use ID internally for Payload query
            },
          }
        : undefined,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      authors: true,
      publishedAt: true,
    },
  })

  return (
    <div className="min-h-screen py-6 md:py-12">
      <PageClient />
      <div className="container">
        <div className="prose dark:prose-invert max-w-none flex items-center justify-between">
          <h1 className="text-white">Posts</h1>
          <CategoryFilter slug="posts" categories={categoriesResult.docs} />
        </div>
        <Separator className="mt-4 pt-1" />
      </div>

      <div className="container py-4 text-white flex justify-end">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} relationTo="posts" />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `John Phung | Posts`,
  }
}
