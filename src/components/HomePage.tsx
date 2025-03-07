import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className="h-full  md:h-screen  text-white flex flex-col gap-4 p-8 md:p-12">
      <h1 className="text-7xl mb-4 font-fira-code font-bold">JOHN PHUNG</h1>
      <h2 className="text-4xl font-roboto">SOFTWARE ENGINEER & BUILDER</h2>
      <Separator className="my-8" />
      <p className="text-2xl font-light font-roboto">
        Hello! My name is JP, and I am a Software Engineer from Sydney, Australia.
      </p>
      <p className="text-2xl font-light font-roboto">
        I have a passion and interest for new emerging web technologies and tinkering with side
        projects to bring ideas to life.
      </p>

      <Button asChild className="my-8 py-6 md:w-[250px] " size="lg">
        <Link href="/projects" className="text-xl text-white flex gap-2 ">
          <span className="font-fira-code text-2xl ">See My Work</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
      </Button>
    </div>
  )
}

export default HomePage
