'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import type { FC } from 'react'
import {
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from 'react-dom'

import { Button, Header, GistIdInput, Alert, Textarea, Label, Footer } from './_components'
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
          <Label htmlFor="result">Result</Label>
          <Textarea
            name="result"
            id="result"
            rows={24}
            defaultValue={state.success ? state.result : ''}
          />
          <div className="mt-2">
            <CopyToClipboardButton text={state.success ? state.result : ''} />
          </div>
        </div>
      </main>
      <Footer />
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
