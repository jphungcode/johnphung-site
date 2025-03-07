'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { Category } from '@/payload-types'
import { useRouter, useSearchParams } from 'next/navigation'

interface CategoryFilterProps {
  slug: string
  categories: Category[]
}

export default function CategoryFilter({ slug, categories }: CategoryFilterProps) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const activeCategory = categories.find((cat) => cat.slug === category)

  const handleCategorySelect = async (category: Category | null) => {
    try {
      const params = new URLSearchParams(searchParams)
      if (category) {
        params.set('category', category.slug as string)
      } else {
        params.delete('category')
      }

      params.delete('page') // Reset page when changing category
      router.push(`/${slug}?${params.toString()}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {activeCategory?.title || 'All Categories'}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuItem onSelect={() => handleCategorySelect(null)}>
          All Categories
        </DropdownMenuItem>
        {categories.map((category) => (
          <DropdownMenuItem key={category.id} onSelect={() => handleCategorySelect(category)}>
            {category.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
