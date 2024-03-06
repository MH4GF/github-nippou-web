// useCallback, useStateはClient Componentでしか使えない
'use client'

import { useState, useCallback } from 'react'
import type { FormEvent, FC } from 'react'

import { CopyToClipboardButton } from '../CopyToClipboardButton'

import { GitHubNippouForm } from './GitHubNippouForm'

import { Alert, Label, Textarea } from '@/app/_components'
import type { NippouResult } from '@/app/types'

export const GitHubNippouMain: FC = () => {
  const [state, setState] = useState<NippouResult>({
    success: true,
    result: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const formAction = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const url = new URL('/api/nippou', window.location.href)
    url.searchParams.set('settingsGistId', formData.get('settingsGistId') as string)
    url.searchParams.set('sinceDate', formData.get('sinceDate') as string)
    url.searchParams.set('untilDate', formData.get('untilDate') as string)
    await fetch(url)
      .then(async (res) => {
        setState((await res.json()) as NippouResult)
      })
      .catch((error: unknown) => {
        console.error(error)
        setState({ success: false, error: 'An unexpected error has occurred' })
      })

    setIsLoading(false)

    return
  }, [])

  return (
    <main className="mx-auto grid max-w-7xl gap-6 p-4 sm:p-6 lg:px-8">
      {!state.success && <Alert>{state.error}</Alert>}
      <GitHubNippouForm formAction={formAction} isLoading={isLoading} />
      <div>
        <Label htmlFor="result">Result</Label>
        <Textarea
          name="result"
          id="result"
          rows={20}
          defaultValue={state.success ? state.result : ''}
        />
        <div className="mt-2">
          <CopyToClipboardButton text={state.success ? state.result : ''} />
        </div>
      </div>
    </main>
  )
}
