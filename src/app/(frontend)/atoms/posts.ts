import { Post } from '@/payload-types'
import { atom } from 'jotai'

export const postsAtom = atom<Post[]>([])
