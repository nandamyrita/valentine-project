import { useEffect, useRef } from 'react'

export default function MusicaFundo() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // O navegador pode bloquear autoplay, aguarda interação
          const clickHandler = () => {
            audio.play()
            document.removeEventListener('click', clickHandler)
          }
          document.addEventListener('click', clickHandler)
        })
      }
    }
  }, [])

  return (
    <audio ref={audioRef} src="/musica.mp3" loop autoPlay hidden />
  )
}
