// src/pages/Start.tsx
import { useNavigate } from 'react-router-dom'

export default function Start() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative">
      <img
        src="/StartTela.gif"
        alt="TelaInicio"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="z-10 text-center">
        <h1 className="text-4xl md:text-7xl font-bold text-white text-outline-pink font-pixel mb-8">
          Nanick
        </h1>
         <p className="text-4xl md:text-6xl font-bold text-white text-outline-pink font-pixel mb-8 "> World</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-pink-500 hover:bg-pink-600 text-white font-pixel py-3 px-6 rounded-lg text-xl  border-none "
        >
          START
        </button>
      </div>
    </div>
  )
}
