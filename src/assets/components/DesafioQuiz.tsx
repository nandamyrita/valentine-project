import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import personagem from '/drakpersonagem.png'

const perguntas = [
  {
    pergunta: 'Qual foi a data que a gente começou a namorar?',
    opcoes: ['13/06', '12/06', '14/02', '25/12'],
    correta: '13/06',
  },
  {
    pergunta: 'Qual foi a primeira vez que a gente conversou?',
    opcoes: ['Pelo insta', 'Na minha sala','Pelo zap', 'No parque do carmo'],
    correta: 'Na minha sala',
  },
  {
    pergunta: 'Qual era nossa comida fav de shopping antes da inflacao?',
    opcoes: ['Ragazzo', 'Maria da Vila', 'Dipz', 'N.A.'],
    correta: 'Dipz',
  },
  {
    pergunta: 'Qual foi o filme que vimos juntos pela primeira vez?',
    opcoes: ['Infinity Castle de Demon Slayer', 'Filme do Suga', 'Demon Slayer: Kimetsu No Yaiba o Filme: Mugen Train ', 'Jujutsu Kaisen 0'],
    correta: 'Jujutsu Kaisen 0',
  },
  {
    pergunta: 'Qual o membro mais bonito do BTS ? kkkk ou admite ou perde',
    opcoes: ['Jimin', 'Yoongi', 'Nathanzinho', 'roberto carlos'],
    correta: 'Yoongi',
  },
]
export default function DesafioQuiz() {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState<'fala-inicial' | 'quiz' | 'resultado'>('fala-inicial')
  const [indice, setIndice] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null)

  // Verifica no localStorage se já completou o quiz
  useEffect(() => {
    const concluido = localStorage.getItem('quizComplete')
    if (concluido === 'true') {
      setEtapa('resultado')
      setAcertos(perguntas.length) // Assume todos certos para mostrar resultado final
    }
  }, [])

  const atual = perguntas[indice]

  function handleResponder(opcao: string) {
    setRespostaSelecionada(opcao)

    if (opcao === atual.correta) {
      setAcertos((a) => a + 1)
    }

    setTimeout(() => {
      setRespostaSelecionada(null)
      if (indice + 1 < perguntas.length) {
        setIndice((i) => i + 1)
      } else {
        setEtapa('resultado')
        localStorage.setItem('quizComplete', 'true')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative font-pixel">
      {/* Fala da personagem */}
      {etapa === 'fala-inicial' && (
        <div className="flex items-end gap-4">
          <img src={personagem} alt="Personagem" className="w-48 h-auto" />
          <div className="bg-white text-black p-4 rounded-lg border-4 border-pink-500 max-w-md">
            <p>Oi! Vamos ver se você está com a memória afiada! Clique para começar o quiz 💡</p>
            <button
              className="mt-4 px-4 py-2 bg-pink-500 text-white border-2 border-white hover:scale-105 transition"
              onClick={() => setEtapa('quiz')}
            >
              Começar!
            </button>
          </div>
        </div>
      )}

      {/* Quiz */}
      {etapa === 'quiz' && (
        <div className="max-w-xl w-full flex flex-col gap-4 bg-pink-100 text-black p-6 rounded-lg border-4 border-pink-500">
          <h2 className="text-xl">Pergunta {indice + 1} de {perguntas.length}</h2>
          <p>{atual.pergunta}</p>
          <div className="flex flex-col gap-2 mt-4">
            {atual.opcoes.map((opcao) => (
              <button
                key={opcao}
                onClick={() => handleResponder(opcao)}
                className={`px-4 py-2 border-2 rounded transition ${
                  respostaSelecionada
                    ? opcao === atual.correta
                      ? 'bg-green-400 border-green-600'
                      : opcao === respostaSelecionada
                      ? 'bg-red-400 border-red-600'
                      : 'bg-gray-200 border-gray-400'
                    : 'bg-white border-black hover:bg-pink-300'
                }`}
                disabled={!!respostaSelecionada}
              >
                {opcao}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resultado final */}
      {etapa === 'resultado' && (
        <div className="flex items-end gap-4">
          <img src={personagem} alt="Personagem" className="w-48 h-auto" />
          <div className="bg-white text-black p-4 rounded-lg border-4 border-pink-500 max-w-md">
            <p>
              Uau! Você acertou <strong>{acertos}</strong> de {perguntas.length} perguntas!
            </p>

            {acertos === perguntas.length && (
              <p className="mt-2 text-green-700 font-bold">Você completou o desafio com sucesso! 🎉</p>
            )}

            <button
              onClick={() => navigate('/Principal')}
              className="mt-4 px-6 py-3 bg-pink-500 text-white border-4 border-white hover:scale-105 transition"
            >
              Voltar para Home
            </button>

            <button
              className="mt-4 px-6 py-3 bg-gray-400 text-black border-4 border-white hover:scale-105 transition ml-2"
              onClick={() => {
                setEtapa('fala-inicial')
                setIndice(0)
                setAcertos(0)
                localStorage.removeItem('quizComplete')
              }}
            >
              Jogar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
