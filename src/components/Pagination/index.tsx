'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
  to: 'projects' | 'posts'
}> = (props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const { className, page, totalPages, to } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPrevPage}
              onClick={() => {
                if (category) {
                  router.push(`/${to}?category=${category}&page=${page - 1}`)
                } else {
                  router.push(`/${to}?page=${page - 1}`)
                }
              }}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (category) {
                    router.push(`/${to}?category=${category}&page=${page - 1}`)
                  } else {
                    router.push(`/${to}?page=${page - 1}`)
                  }
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              isActive
              onClick={() => {
                if (category) {
                  router.push(`/${to}?category=${category}&page=${page}`)
                } else {
                  router.push(`/${to}?page=${page}`)
                }
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (category) {
                    router.push(`/${to}?category=${category}&page=${page + 1}`)
                  } else {
                    router.push(`/${to}?page=${page + 1}`)
                  }
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              onClick={() => {
                if (category) {
                  router.push(`/${to}?category=${category}&page=${page + 1}`)
                } else {
                  router.push(`/${to}?page=${page + 1}`)
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
