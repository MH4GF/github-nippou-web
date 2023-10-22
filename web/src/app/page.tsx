'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import type { FC } from 'react'
import {
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from 'react-dom'

import { Button, Header, GistIdInput, Alert } from './_components'
import { CopyToClipboardButton } from './_features/CopyToClipboardButton'
import { showList } from './showList'

interface SubmitButtonProps {
  isLoading: boolean
  isDisabled: boolean
}

const SubmitButton: FC<SubmitButtonProps> = ({ isLoading, isDisabled }) => {
  const { pending } = useFormStatus()

  return (
    <Button isLoading={isLoading || pending} type="submit" isDisabled={isDisabled}>
      Run
    </Button>
  )
}

function Home() {
  const { status, data } = useSession()
  const isLoading = status === 'loading'
  const isUnAuthenticated = status === 'unauthenticated'
  const [state, formAction] = useFormState(showList, {
    success: true,
    result: '',
  })

  return (
    <div className="min-h-full">
      <Header data={data} isUnAuthenticated={isUnAuthenticated} />
      <main className="mx-auto grid max-w-7xl gap-6 sm:px-6 sm:py-4 lg:px-8">
        <div>{!state.success && <Alert>{state.error}</Alert>}</div>
        <form action={formAction} className="grid gap-2">
          <details>
            <summary>Advanced Settings</summary>
            <GistIdInput />
          </details>
          <div>
            <SubmitButton isLoading={isLoading} isDisabled={isUnAuthenticated} />
          </div>
        </form>
        <div>
          <label htmlFor="result" className="block text-sm font-medium leading-6 text-gray-900">
            Result
          </label>
          <textarea
            name="result"
            id="result"
            rows={24}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900
          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
           focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            defaultValue={state.success ? state.result : ''}
          />
          <div className="mt-2">
            <CopyToClipboardButton text={state.success ? state.result : ''} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  )
}
