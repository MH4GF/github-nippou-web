import type { ComponentProps, FC } from 'react'

type Props = Omit<ComponentProps<'input'>, 'className'>

export const Input: FC<Props> = (props) => {
  return (
    <input
      {...props}
      className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm
                placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500
                sm:text-sm"
    />
  )
}
