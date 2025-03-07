'use client'
import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
  relationTo: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, relationTo } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="flex flex-col gap-4">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="" key={result.slug}>
                  <Card
                    className="h-full md:grid md:grid-cols-[200px_auto] md:gap-4"
                    doc={result}
                    relationTo={relationTo}
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
