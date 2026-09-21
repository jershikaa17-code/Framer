import { useState } from 'react'

interface LazyCoverImageProps {
  src: string
  alt: string
  className?: string
}

// Cover images sit on a dotted placeholder texture (see the parent's
// background-image in CSS) and fade in once loaded, instead of popping in
// abruptly or leaving a blank box while the network request is in flight.
export function LazyCoverImage({ src, alt, className = '' }: LazyCoverImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`lazy-cover-img ${loaded ? 'is-loaded' : ''} ${className}`}
      onLoad={() => setLoaded(true)}
    />
  )
}
