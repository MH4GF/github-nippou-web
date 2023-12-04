import 'server-only'

import type { FC, PropsWithChildren } from 'react'

export const HeaderPresenter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
                github-nippou
              </h2>
            </div>
          </div>
          <div className="gap-2 sm:ml-6 sm:flex sm:items-center">{children}</div>
        </div>
      </div>
    </nav>
  )
}
