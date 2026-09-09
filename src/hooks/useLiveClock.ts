import { useEffect, useState } from 'react'

function formatLA(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

export function useLiveClock(): string {
  const [time, setTime] = useState<string>(() => formatLA(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatLA(new Date()))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  return time
}
