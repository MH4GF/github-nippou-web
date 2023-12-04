// GitHubButtonがClass Componentのため、Client Componentでしか呼び出せない
'use client'
import GitHubButton from 'react-github-btn'

export const GitHubStarButton = () => {
  return (
    <GitHubButton
      href="https://github.com/MH4GF/github-nippou-web"
      data-show-count="true"
      aria-label="Star MH4GF/github-nippou-web on GitHub"
    >
      Star
    </GitHubButton>
  )
}
