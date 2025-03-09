'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '../ui/button'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'authors' | 'publishedAt' | 'populatedAuthors'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'projects'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, populatedAuthors, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article className={cn('', className)} ref={card.ref}>
      <div className="relative w-full">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className="px-4 md:p-0" imgClassName="rounded-lg" resource={metaImage} size="" />
        )}
      </div>
      <div className="p-4 md:p-0 flex flex-col gap-1">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm ">
            {showCategories && hasCategories && (
              <div className="flex flex-wrap">
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <div key={index} className="text-white">
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose text-white">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className=" text-white">{description && <p>{sanitizedDescription}</p>}</div>
        )}
        {/* {categories &&
          categories.map((category) => {
            return <div key={`${category.title}`}></div>
          })} */}
        <div className="flex flex-col md:flex-row gap-2 md:items-center text-white md:justify-between">
          <div className="flex gap-2 items-center">
            {populatedAuthors?.map((author) => {
              return <div key={author.name}>{author.name}</div>
            })}
            <span>✪</span>
            {publishedAt && <span>{parseISOToDDMMYYYY(publishedAt as string)}</span>}
          </div>

          <div className="">
            <Button className="w-full" asChild>
              <Link href={href} ref={link.ref}>
                Read more
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

function parseISOToDDMMYYYY(isoString: string) {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // +1 because months are 0-indexed
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
