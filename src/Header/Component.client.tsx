'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'
import { Separator } from '@/components/ui/separator'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  // const [theme, setTheme] = useState<string | null>(null)
  // const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)

  // useEffect(() => {
  //   setHeaderTheme(null)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname])

  // useEffect(() => {
  //   if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [headerTheme])

  return (
    <>
      <header className="sticky fixed top-0 left-0 right-0 md:hidden">
        <Sheet onOpenChange={setOpen} open={open}>
          <div className="flex items-center px-4  py-2 justify-between bg-[rgba(0,0,0,0.8)]">
            <SheetTrigger className="w-full  ">
              <div className="flex items-center justify-between ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </SheetTrigger>
            <span className="font-fira-code font-bold text-2xl text-white">JP</span>
          </div>

          <SheetContent className="bg-gray-100">
            <SheetHeader>
              <SheetTitle className="text-left font-fira-code">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 justify-between ">
              <div className="flex flex-col justify-between py-8 gap-2">
                {(data?.navItems || []).map(({ link }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      onClick={() => setOpen(false)}
                      className="text-xl text-black"
                      {...link}
                      appearance="link"
                    />
                  )
                })}
              </div>
              <p className="font-fira-code">Get in touch via my socials!</p>
              <div className="flex gap-4 ">
                <a
                  href="https://x.com/thesilentjp"
                  target="_blank"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500"
                  style={{
                    backgroundColor: 'rgb(158, 255, 0)',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25px"
                    height="25px"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                      fill="#333"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/john-phung-0791817a/"
                  target="_blank"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500"
                  style={{
                    backgroundColor: 'rgb(158, 255, 0)',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25px"
                    height="25px"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#333"
                      d="M0 160h114.496v352H0zM426.368 164.128c-1.216-.384-2.368-.8-3.648-1.152a74.218 74.218 0 00-4.64-.896c-6.08-1.216-12.736-2.08-20.544-2.08-66.752 0-109.088 48.544-123.04 67.296V160H160v352h114.496V320s86.528-120.512 123.04-32v224H512V274.464c0-53.184-36.448-97.504-85.632-110.336z"
                    ></path>
                    <circle cx="56" cy="56" r="56"></circle>
                  </svg>
                </a>
              </div>
              <Separator />
              <div className="">
                <p className="font-roboto">Built with ❤️ and ☕</p>
                <p className="text-sm text-gray-500">Next.js & PayloadCms</p>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <header className="hidden md:sticky md:top-0 md:left-0 md:flex md:absolute pl-4 md:py-12 flex-col justify-between h-screen">
        <div className="flex justify-between">
          <HeaderNav data={data} />
        </div>
        <div className="flex flex-col gap-4">
          <a
            href="https://x.com/thesilentjp"
            target="_blank"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500"
            style={{
              backgroundColor: 'rgb(158, 255, 0)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 512 512"
            >
              <path
                d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                fill="#333"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/john-phung-0791817a/"
            target="_blank"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500"
            style={{
              backgroundColor: 'rgb(158, 255, 0)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 512 512"
            >
              <path
                fill="#333"
                d="M0 160h114.496v352H0zM426.368 164.128c-1.216-.384-2.368-.8-3.648-1.152a74.218 74.218 0 00-4.64-.896c-6.08-1.216-12.736-2.08-20.544-2.08-66.752 0-109.088 48.544-123.04 67.296V160H160v352h114.496V320s86.528-120.512 123.04-32v224H512V274.464c0-53.184-36.448-97.504-85.632-110.336z"
              ></path>
              <circle cx="56" cy="56" r="56"></circle>
            </svg>
          </a>
        </div>
        <div className="">
          <p className="text-white font-roboto">Built with ❤️ and ☕</p>
        </div>
      </header>
    </>
  )
}
