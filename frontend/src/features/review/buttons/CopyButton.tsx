import { useState } from 'react'

interface CopyButtonProps {
  text: string
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      className="button"
      onClick={handleCopy}
      disabled={!text}
    >
      {copied ? 'Copied!' : 'Copy Code'}
    </button>
  )
}