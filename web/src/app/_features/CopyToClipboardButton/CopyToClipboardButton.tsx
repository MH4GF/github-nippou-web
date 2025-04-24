// navigator.clipboardを使いたいためClient Componentに
'use client'

import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { Tooltip } from './Tooltip'
import { useSuccessTooltip } from './useSuccessTooltip'

import { Button } from '@/app/_components'

interface Props {
  text: string
}

export const CopyToClipboardButton: FC<Props> = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useSuccessTooltip()

  const handleClick = useCallback(() => {
    setIsLoading(true)
    navigator.clipboard
      .writeText(text)
      .then(() => setShowTooltip(true))
      .catch((_e) => {
        /* エラー処理 */
      })
    setIsLoading(false)
  }, [text, setShowTooltip])

  return (
    <span className="relative">
      <Tooltip show={showTooltip} />
      <Button isLoading={isLoading} onClick={handleClick} variant="secondary">
        Copy to Clipboard
      </Button>
    </span>
  )
}
