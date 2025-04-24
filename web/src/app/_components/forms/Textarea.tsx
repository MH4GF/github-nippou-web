import type { ComponentProps, FC } from 'react'

type Props = Omit<ComponentProps<'textarea'>, 'className'>

export const Textarea: FC<Props> = (props) => {
  return (
    <textarea
      {...props}
      className={`
      block w-full rounded-md border-0 p-1.5 text-slate-900 bg-white
      shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400
      focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6`}
    />
  )
}
