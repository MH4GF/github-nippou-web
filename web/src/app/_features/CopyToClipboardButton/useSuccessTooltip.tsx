import { useEffect, useState } from 'react'

export const useSuccessTooltip = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!show) {
      return
    }

    const timer = setTimeout(() => {
      setShow(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [show])

  return [show, setShow] as const
}
