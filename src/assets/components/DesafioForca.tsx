import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import personagem from '/morangopersonagem.png'

const palavras = ['MINHA NAMORADA E LINDA']

const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('')

export default function DesafioForca() {
  const navigate = useNavigate()
  const [palavra, setPalavra] = useState('')
  const [letrasEscolhidas, setLetrasEscolhidas] = useState<string[]>([])
  const [tentativasErradas, setTentativasErradas] = useState(0)
  const maxTentativas = 6
  const [status, setStatus] = useState<'jogando' | 'venceu' | 'perdeu'>('jogando')
  const [etapa, setEtapa] = useState<'fala-inicial' | 'jogo' | 'resultado'>('fala-inicial')

  useEffect(() => {
    // Escolhe palavra aleatória e reseta estados
    const aleatoria = palavras[Math.floor(Math.random() * palavras.length)]
    setPalavra(aleatoria)
    setLetrasEscolhidas([])
    setTentativasErradas(0)
    setStatus('jogando')
    setEtapa('fala-inicial')
  }, [])

  // Verifica vitória e derrota
useEffect(() => {
  if (etapa === 'jogo') {
    const letrasDaPalavra = palavra.split('')
    const ganhou = letrasDaPalavra.every((l) => letrasEscolhidas.includes(l))
    if (ganhou) {
      setStatus('venceu')
      localStorage.setItem('hangmanComplete', 'true')
    } else if (tentativasErradas >= maxTentativas) {
      setStatus('perdeu')
    }
  }
}, [letrasEscolhidas, tentativasErradas, palavra, etapa])


  function escolherLetra(letra: string) {
    if (status !== 'jogando') return
    if (letrasEscolhidas.includes(letra)) return

    setLetrasEscolhidas((prev) => [...prev, letra])
    if (!palavra.includes(letra)) {
      setTentativasErradas((prev) => prev + 1)
    }
  }

  function mostrarPalavra() {
    return palavra
      .split('')
      .map((letra, i) =>
        letrasEscolhidas.includes(letra) ? (
          <span key={i} className="inline-block w-6 border-b-2 border-black text-center">
            {letra}
          </span>
        ) : (
          <span key={i} className="inline-block w-6 border-b-2 border-black text-center">
            &nbsp;
          </span>
        )
      )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-pixel relative">
      {/* Fala inicial */}
      {etapa === 'fala-inicial' && (
        <div className="flex items-end gap-4 max-w-md">
          <img src={personagem} alt="Personagem" className="w-48 h-auto" />
          <div className="bg-white text-black p-4 rounded-lg border-4 border-pink-500 max-w-xs">
            <p>Vamos jogar forca? Tente adivinhar a palavra antes que acabe as tentativas!</p>
            <button
              onClick={() => setEtapa('jogo')}
              className="mt-4 px-4 py-2 bg-pink-500 text-white border-2 border-white hover:scale-105 transition"
            >
              Começar
            </button>
          </div>
        </div>
      )}

      {/* Jogo da forca */}
      {etapa === 'jogo' && (
        <div className="flex flex-col items-center gap-8 max-w-md w-full p-4 bg-pink-100 rounded-lg border-4 border-pink-500 text-black">
          {/* Palavra */}
          <div className="text-4xl tracking-widest select-none">{mostrarPalavra()}</div>

          {/* Letras */}
          <div className="grid grid-cols-7 gap-2">
            {alfabeto.map((letra) => (
              <button
                key={letra}
                onClick={() => escolherLetra(letra)}
                disabled={letrasEscolhidas.includes(letra) || status !== 'jogando'}
                className={`p-2 rounded border-2 border-pink-500 ${
                  letrasEscolhidas.includes(letra) ? 'bg-pink-400 text-white cursor-not-allowed' : 'hover:bg-pink-300'
                } transition`}
              >
                {letra}
              </button>
            ))}
          </div>

          {/* Tentativas e letras erradas */}
          <div className="text-lg">
            Tentativas restantes: {maxTentativas - tentativasErradas}
          </div>
          <div className="text-red-600">
            Letras erradas:{' '}
            {letrasEscolhidas
              .filter((l) => !palavra.includes(l))
              .join(', ') || 'Nenhuma'}
          </div>
        </div>
      )}

      {/* Resultado final */}
      {(status === 'venceu' || status === 'perdeu') && etapa === 'jogo' && (
        <div className="flex items-end gap-4 max-w-md mt-8">
          <img src={personagem} alt="Personagem" className="w-48 h-auto" />
          <div className="bg-white text-black p-4 rounded-lg border-4 border-pink-500 max-w-xs">
            {status === 'venceu' ? (
              <p>Parabéns! Você adivinhou a palavra! 🎉</p>
            ) : (
              <p>Ops! Você perdeu! A palavra era <strong>{palavra}</strong>. Tente de novo!</p>
            )}
            <button
              onClick={() => {
                
                const aleatoria = palavras[Math.floor(Math.random() * palavras.length)]
                setPalavra(aleatoria)
                setLetrasEscolhidas([])
                setTentativasErradas(0)
                setStatus('jogando')
              }}
              className="mt-4 px-6 py-3 bg-pink-500 text-white border-4 border-white hover:scale-105 transition"
            >
              Jogar novamente
            </button>
            <button
              onClick={() => navigate('/principal')}
              className="mt-4 px-6 py-3 bg-gray-400 text-black border-4 border-white hover:scale-105 transition ml-2"
            >
              Voltar para Home
            </button>

            
          </div>
          
        </div>
      )}
    </div>
  )
}
