import type { FC, PropsWithChildren } from 'react'

export const Alert: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-md bg-red-50 p-4 shadow-sm ">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-bold text-red-800">エラーが発生しました</h3>
          <div className="mt-2 text-sm text-red-700">{children}</div>
        </div>
      </div>
    </div>
  )
}
