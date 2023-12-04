// useFormStatusはClient Componentでしか動作しない
'use client'

import type { FC } from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/app/_components'

export const SubmitButton: FC = () => {
  const { pending } = useFormStatus()

  return (
    <Button isLoading={pending} type="submit">
      Run
    </Button>
  )
}
