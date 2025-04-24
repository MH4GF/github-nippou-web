import type { ComponentProps, FC, ReactNode } from 'react'

type Props = Omit<ComponentProps<'label'>, 'children'> & {
  children: ReactNode
  htmlFor?: string
}

export const Label: FC<Props> = ({ children, htmlFor, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={'block text-sm font-medium leading-6 text-slate-900'}
    >
      {children}
    </label>
  )
}
