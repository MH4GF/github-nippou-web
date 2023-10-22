import clsx from 'clsx'
import type { FC } from 'react'

interface Props {
  show: boolean
}

export const Tooltip: FC<Props> = ({ show: show }) => {
  return (
    <span
      className={clsx(
        show ? 'opacity-100' : 'opacity-0',
        `absolute -top-12 left-1/2 -translate-x-1/2
      whitespace-nowrap rounded bg-slate-800
      px-2 py-1 text-white
      transition before:absolute before:left-1/2
      before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent
      before:border-t-slate-800 before:content-['']
      `,
      )}
    >
      Copied!!
    </span>
  )
}
