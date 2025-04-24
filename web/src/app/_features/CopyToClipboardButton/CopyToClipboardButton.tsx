// navigator.clipboardを使いたいためClient Componentに
'use client'

import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { Tooltip } from './Tooltip'
import { useSuccessTooltip } from './useSuccessTooltip'

import { Alert, Button } from '@/app/_components'

interface Props {
  text: string
}

export const CopyToClipboardButton: FC<Props> = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useSuccessTooltip()

  const handleClick = useCallback(() => {
    setError(null)
    setIsLoading(true)
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowTooltip(true)
        setIsLoading(false)
      })
      .catch((e) => {
        console.error('Failed to copy to clipboard', e)
        setError('Failed to copy to clipboard. Please check your browser permissions.')
        setIsLoading(false)
      })
  }, [text, setShowTooltip])

  return (
    <div className="space-y-2">
      {error && <Alert>{error}</Alert>}
      <span className="relative">
        <Tooltip show={showTooltip} />
        <Button isLoading={isLoading} onClick={handleClick} variant="secondary">
          Copy to Clipboard
        </Button>
      </span>
    </div>
  )
}
