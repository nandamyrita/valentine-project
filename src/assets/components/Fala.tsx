// src/components/Dialogo.tsx
import { useState } from 'react'

interface Fala {
  texto: string
  personagemImg: string
}

export default function Fala({ falas }: { falas: Fala[] }) {
  const [index, setIndex] = useState(0)
  const [visivel, setVisivel] = useState(true)

  const proximaFala = () => {
    if (index < falas.length - 1) {
      setIndex(index + 1)
    } else {
      setVisivel(false) // esconde após última fala
    }
  }

  if (!visivel) return null

  return (
    <div
      className="fixed bottom-0 left-0 w-full flex items-end gap-4 p-4 z-50"
      onClick={proximaFala}
    >
      <img
        src={falas[index].personagemImg}
        alt="Personagem"
        className="w-64 h-auto"
      />
      <div className="bg-white bg-opacity-90 text-black p-4 rounded-lg max-w-md border-4 border-pink-500 font-pixel cursor-pointer ">
        {falas[index].texto}
      </div>
    </div>
  )
}
