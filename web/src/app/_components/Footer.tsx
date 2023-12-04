// GitHubStarButtonがClass Componentのため、Client Componentでしか呼び出せない
'use client'
import Link from 'next/link'

import { GitHubStarButton } from './GitHubStarButton'

export const Footer = () => {
  return (
    <footer>
      <p className="inline-flex w-full justify-center gap-2">
        <span>
          Built by&nbsp;
          <Link
            href="https://twitter.com/MH4GF"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @MH4GF
          </Link>
          .
        </span>
        <GitHubStarButton />
      </p>
    </footer>
  )
}
