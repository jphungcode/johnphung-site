import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post, Project } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post | Project
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="container md:pt-4 ">
      <div className="max-w-[48rem] mx-auto flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <div className="flex items-center justify-between mt-2">
          {hasAuthors && (
            <div className="flex items-center gap-1">
              <p className="font-medium text-white">By</p>

              <p className="text-white">{formatAuthors(populatedAuthors)}</p>
            </div>
          )}
          {publishedAt && (
            <time className="text-white" dateTime={publishedAt}>
              {formatDateTime(publishedAt)}
            </time>
          )}
        </div>
        <div className="select-none overflow-hidden ">
          {heroImage && typeof heroImage !== 'string' && (
            <Media imgClassName="w-full object-contain rounded-lg" resource={heroImage} />
          )}
        </div>
      </div>
    </div>
  )
  return (
    <div className="">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
