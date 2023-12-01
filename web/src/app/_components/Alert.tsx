import type { FC, PropsWithChildren } from 'react'

export const Alert: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-md bg-red-50 p-4 shadow-sm">
      <p className="ml-3 mt-2 text-sm font-bold text-red-700">{children}</p>
    </div>
  )
}
