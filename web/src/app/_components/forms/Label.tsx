import type { ComponentProps, FC } from 'react'

type Props = ComponentProps<'label'>

export const Label: FC<Props> = (props) => {
  return <label {...props} className={`block text-sm font-medium leading-6 text-gray-900`} />
}
