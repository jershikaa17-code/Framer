import { useEffect, useState } from 'react'

// Fetches a video as a Blob and returns an object URL, instead of letting
// <video src="..."> stream it directly over HTTP range requests. Needed
// because Vite's dev/preview static server mishandles suffix byte-range
// requests ("bytes=-N", meaning "last N bytes") — it returns the *first* N
// bytes while claiming (via Content-Range) they're the last. Chrome's video
// element probes the tail of an MP4 this way on load, gets back mislabeled
// head bytes, and hangs at readyState 0 forever. A plain full-file fetch
// (no Range header) isn't affected, so loading the whole blob upfront and
// handing the element an object URL avoids the bug entirely.
export function useBlobVideoUrl(src: string): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let objectUrl: string | null = null
    let cancelled = false

    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
      })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [src])

  return url
}
