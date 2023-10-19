'use client'

import Link from 'next/link'

export default function Error() {
  return (
    <div className="text-center grid gap-4">
      <h2 className="text-2xl">Something went wrong!</h2>
      <p>
        このサイトは無料のサーバーを利用しているので、アクセスがないと自動で終了し、
        <br />
        そのあとアクセスすると起動に時間がかかってエラーになってしまいます。
        <br />
        <br />
        リロードして何度か試すと直ることが多いので、試してみてね！
        <br />
        それでもおかしい時は
        <Link href="https://twitter.com/MH4GF" className="underline">
          @MH4GF
        </Link>
        に教えてください！
      </p>
    </div>
  )
}
