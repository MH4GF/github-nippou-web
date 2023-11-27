'use client'

import Link from 'next/link'
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
  isDisabled: boolean
}

const SubmitButton: FC<SubmitButtonProps> = ({ isDisabled }) => {
  const { pending } = useFormStatus()

  return (
    <Button isLoading={pending} type="submit" isDisabled={isDisabled}>
      Run
    </Button>
  )
}

function Home() {
  const { status, data } = useSession()
  const isUnAuthenticated = status === 'unauthenticated'
  const [state, formAction] = useFormState(showList, {
    success: true,
    result: '',
  })

  return (
    <div className="min-h-full">
      <Header data={data} isUnAuthenticated={isUnAuthenticated} />
      <main className="mx-auto grid max-w-7xl gap-6 sm:p-6 lg:px-8">
        {!state.success && <Alert>{state.error}</Alert>}
        <form action={formAction} className="grid gap-2">
          <details>
            <summary>Advanced Settings</summary>
            <GistIdInput />
          </details>
          <div>
            <SubmitButton isDisabled={isUnAuthenticated} />
          </div>
        </form>
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
        <div>
          <h3 className="text-xl font-bold">How to use github-nippou?</h3>
          <p>
            Print today&apos;s your GitHub activity for issues and pull requests.
            <br />
            This is a helpful when you write a daily report in reference to GitHub.
            &quot;Nippou&quot; is a japanese word which means a daily report.
            <br />
            This site is based on{' '}
            <Link
              href="https://github.com/masutaka/github-nippou"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              github-nippou
            </Link>
            , a CLI tool created by{' '}
            <Link
              href="https://twitter.com/masutaka"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @masutaka
            </Link>
            .
          </p>
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
