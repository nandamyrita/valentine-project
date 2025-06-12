import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import personagem from '/lamenpersonagem.png'

// Base das cartas com imagens
const cardsBase = [
  { tipo: 'imagem', valor: '/img1.jpeg' },
  { tipo: 'imagem', valor: '/img2.jpeg' },
  { tipo: 'imagem', valor: '/img3.jpeg' },
  { tipo: 'imagem', valor: '/img4.jpeg' },
  { tipo: 'imagem', valor: '/img5.jpeg' },
  { tipo: 'imagem', valor: '/img6.jpeg' },
]

type Card = {
  id: number
  imagem: { tipo: string; valor: string }
  matched: boolean
}

function embaralharCartas(array: Card[]) {
  return array.sort(() => Math.random() - 0.5)
}

export default function DesafioMemoria() {
  const navigate = useNavigate()
  const [cartas, setCartas] = useState<Card[]>([])
  const [primeiraEscolha, setPrimeiraEscolha] = useState<Card | null>(null)
  const [segundaEscolha, setSegundaEscolha] = useState<Card | null>(null)
  const [disabled, setDisabled] = useState(false)

  const [etapa, setEtapa] = useState<'fala-inicial' | 'jogo' | 'resultado'>('fala-inicial')

  // Inicializa as cartas embaralhadas
  useEffect(() => {
    const cartasDuplicadas = [...cardsBase, ...cardsBase].map((imagem, index) => ({
      id: index,
      imagem,
      matched: false,
    }))
    setCartas(embaralharCartas(cartasDuplicadas))
  }, [])

  // Comparar escolhas
  useEffect(() => {
    if (primeiraEscolha && segundaEscolha) {
      setDisabled(true)
      if (primeiraEscolha.imagem.valor === segundaEscolha.imagem.valor) {
        setCartas((prev) =>
          prev.map((card) =>
            card.imagem.valor === primeiraEscolha.imagem.valor ? { ...card, matched: true } : card
          )
        )
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [primeiraEscolha, segundaEscolha])

  // Verifica se completou o jogo
  useEffect(() => {
    if (cartas.length > 0 && cartas.every((c) => c.matched)) {
      
      setEtapa('resultado')
      localStorage.setItem('memoryComplete', 'true')
    }
  }, [cartas])

  function resetTurn() {
    setPrimeiraEscolha(null)
    setSegundaEscolha(null)
    setDisabled(false)
  }

  function handleEscolha(card: Card) {
    if (!disabled) {
      if (primeiraEscolha === null) {
        setPrimeiraEscolha(card)
      } else if (primeiraEscolha.id !== card.id) {
        setSegundaEscolha(card)
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-pixel relative">
      {/* Fala inicial */}
      {etapa === 'fala-inicial' && (
        <div className="flex items-end gap-4 max-w-md">
          <img src={personagem} alt="Personagem" className="w-48 h-auto" />
          <div className="bg-white text-black p-4 rounded-lg border-4 border-pink-500">
            <p>Vamos testar sua memória? Encontre todos os pares para completar o desafio!</p>
            <button
              onClick={() => setEtapa('jogo')}
              className="mt-4 px-4 py-2 bg-pink-500 text-white border-2 border-white hover:scale-105 transition"
            >
              Começar
            </button>
          </div>
        </div>
      )}

      {/* Jogo da memória */}
      {etapa === 'jogo' && (
        <div className="max-w-xl w-full grid grid-cols-4 gap-4 p-4 bg-pink-100 text-black rounded-lg border-4 border-pink-500">
          {cartas.map((card) => {
            const virar =
              card === primeiraEscolha ||
              card === segundaEscolha ||
              card.matched
            return (
              <button
                key={card.id}
                onClick={() => handleEscolha(card)}
                disabled={virar}
                className={`aspect-square flex items-center justify-center rounded-lg border-4 border-pink-500
                  ${virar ? 'bg-white' : 'bg-pink-400'}
                  hover:scale-110 transition overflow-hidden
                `}
              >
                {virar ? (
                  <img src={card.imagem.valor} alt="Carta" className="w-full h-full object-cover" />
                ) : (
                  '?'
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Resultado final */}
      {etapa === 'resultado' && (
        <div className="flex items-end gap-4 max-w-md">
          <img src={personagem} alt="Personagem" className="w-48 h-auto" />
          <div className="bg-white text-black p-4 rounded-lg border-4 border-pink-500">
            <p>Parabéns! Você encontrou todos os pares! 🎉</p>
            <button
              onClick={() => navigate('/Principal')}
              className="mt-4 px-6 py-3 bg-pink-500 text-white border-4 border-white hover:scale-105 transition"
            >
              Voltar para Home
            </button>
            <button
              onClick={() => {
                const cartasDuplicadas = [...cardsBase, ...cardsBase].map((imagem, index) => ({
                  id: index,
                  imagem,
                  matched: false,
                }))
                setCartas(embaralharCartas(cartasDuplicadas))
                setEtapa('jogo')
                resetTurn()
              }}
              className="mt-4 px-6 py-3 bg-gray-400 text-black border-4 border-white hover:scale-105 transition ml-2"
            >
              Jogar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
