import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')
  const page = parseInt(searchParams.get('page') || '1', 10)

  const payload = await getPayload({ config: configPromise })

  try {
    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      page,
      overrideAccess: false,
      where: categoryId
        ? {
            categories: {
              equals: categoryId,
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

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
