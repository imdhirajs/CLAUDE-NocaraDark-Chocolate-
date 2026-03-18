'use client'

interface Props {
  progress: number
}

export default function ScrollProgressBar({ progress }: Props) {
  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress * 100}%` }}
      aria-hidden="true"
    />
  )
}
