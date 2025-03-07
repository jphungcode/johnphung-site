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
}
