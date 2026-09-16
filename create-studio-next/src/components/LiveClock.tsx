'use client'

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

export function LiveClock() {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    setTime(formatLA(new Date()))
    const id = window.setInterval(() => setTime(formatLA(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className="font-mono-label text-[13px] leading-[1.3] text-white">
      OUR TIME {time}
      <br />
      UTC−8 LOS ANGELES
    </p>
  )
}
