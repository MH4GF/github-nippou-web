import type { FC } from 'react'

import { Button } from '@/app/_components'

interface Props {
  isLoading: boolean
}

export const SubmitButton: FC<Props> = ({ isLoading }) => {
  return (
    <Button isLoading={isLoading} type="submit">
      Run
    </Button>
  )
}
