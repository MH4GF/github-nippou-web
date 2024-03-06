/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// useFormStateはClient Componentでしか使えない
'use client'

import type { FC } from 'react'
import { useFormState } from 'react-dom'

import { CopyToClipboardButton } from '../CopyToClipboardButton'

import { GitHubNippouForm } from './GitHubNippouForm'

import { Alert, Label, Textarea } from '@/app/_components'
import { showList } from '@/app/showList'

export const GitHubNippouMain: FC = () => {
  const [state, formAction] = useFormState(showList, {
    success: true,
    result: '',
  })

  return (
    <main className="mx-auto grid max-w-7xl gap-6 p-4 sm:p-6 lg:px-8">
      {state?.success === false && <Alert>{state.error}</Alert>}
      <GitHubNippouForm formAction={formAction} />
      <div>
        <Label htmlFor="result">Result</Label>
        <Textarea
          name="result"
          id="result"
          rows={20}
          defaultValue={state?.success ? state.result : ''}
        />
        <div className="mt-2">
          <CopyToClipboardButton text={state?.success ? state.result : ''} />
        </div>
      </div>
    </main>
  )
}
