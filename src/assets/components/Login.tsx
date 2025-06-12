import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mensagemAlerta, setMensagemAlerta] = useState<string | null>(null)

  const senhaCorreta = '13-06'

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    if (!username || !password) {
      setMensagemAlerta('Preencha usuário e senha!')
      return
    }

    if (password === senhaCorreta) {
      localStorage.setItem('playerName', username)
      navigate('/principal')
    } else {
      setMensagemAlerta('Senha incorreta!')
    }
  }

  return (
    <div className="min-h-screen text-white flex items-center justify-center relative">

      {/* Fundo animado */}
      <img
        src="/StartTela.gif"
        alt="TelaInicio"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Alerta estilizado */}
      {mensagemAlerta && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white text-black border-4 border-pink-500 rounded-lg p-4 font-pixel shadow-lg">
            <p>{mensagemAlerta}</p>
            <button
              onClick={() => setMensagemAlerta(null)}
              className="mt-2 px-4 py-1 bg-pink-500 text-white border-2 border-white hover:scale-105 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Formulário */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white bg-opacity-40 border-4 border-pink-500 rounded-lg p-8 max-w-sm w-full flex flex-col gap-6 font-pixel"
      >
        <h2 className="text-pink-500 text-3xl mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-white bg-opacity-50 border-2 border-pink-500 rounded px-4 py-2 text-black font-pixel focus:outline-none focus:ring-2 focus:ring-pink-500"
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white bg-opacity-50 border-2 border-pink-500 rounded px-4 py-2 text-black font-pixel focus:outline-none focus:ring-2 focus:ring-pink-500"
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 rounded text-white font-pixel py-3 font-bold border-4 border-white"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
