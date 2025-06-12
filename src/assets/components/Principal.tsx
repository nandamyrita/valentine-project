// src/pages/Main.tsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Fala from "./Fala";

export default function Principal() {
  const navigate = useNavigate();
  const [allCompleted, setAllCompleted] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("playerName");
    console.log("Nome carregado:", storedName);
    if (storedName) setName(storedName);

    const quizComplete = localStorage.getItem("quizComplete") === "true";
    const memoryComplete = localStorage.getItem("memoryComplete") === "true";
    const hangmanComplete = localStorage.getItem("hangmanComplete") === "true";
    setAllCompleted(quizComplete && memoryComplete && hangmanComplete);
  }, []);

  return (
    <div className="relative min-h-screen bg-pink-100">
      {/* Imagem de fundo que cobre toda a tela */}
      <img
        src="/Cenario.png"
        alt="Cenário"
        className="object-cover object-center absolute inset-0 z-0"
      />

      {/* SVGs clicáveis sobre o cenário */}

      <div className="relative z-10 w-full h-screen">
        <img
          src="/desafio1.svg"
          alt="Desafio 1"
          onClick={() => navigate("/DesafioQuiz")}
          className="absolute bottom-[70%] left-[50%] w-12 h-12 cursor-pointer  animate-glow transition-transform duration-300 hover:scale-110  "
        />

        {/* Desafio 2 */}
        <img
          src="/desafio2.svg"
          alt="Desafio 2"
          onClick={() => navigate("/DesafioMemoria")}
          className="absolute bottom-[30%] left-[13%] w-14 h-14 cursor-pointer  animate-glow transition-transform duration-300 hover:scale-110"
        />

        {/* Desafio 3 */}
        <img
          src="/desafio3.svg"
          alt="Desafio 3"
          onClick={() => navigate("/DesafioForca")}
          className="absolute bottom-[6%] left-[40%] w-15 h-15 cursor-pointer  animate-glow transition-transform duration-300 hover:scale-110"
        />
      </div>

      {!allCompleted && (
        <Fala
          falas={[
            {
              texto: `Bem vindo, ${name} 💖! Esse aqui é o nosso mundo, eu coloquei coisinhas que só a gente entenderia e espero que aproveite esse presente daora, pois afinal, nao se faz 3 anos de namoro todo dia.`,
              personagemImg: "/personagem.png",
            },
            {
              texto:
                "Eu separei 3 itens dentro do jogo, clique neles e descubra algo.",
              personagemImg: "/personagem2.png",
            },
          ]}
        />
      )}

      {/* Fala com QR Code final */}
      {allCompleted && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-70 font-pixel">
          <div className="flex flex-col items-center bg-white border-4 border-pink-500 rounded-xl p-6 text-center max-w-md">
            <img
              src="/ultimopersonagem.png"
              alt="Personagem feliz"
              className="w-40 h-40 mb-4"
            />
            <p className="text-black text-lg font-bold mb-2">
              Parabéns, {name}! Você completou todos os desafios! 💖
            </p>
            <img src="/QRCode.jpeg" alt="QR Code" className="w-32 h-32 my-2" />
            <p className="text-pink-600 text-sm">
              Escaneie para ver a surpresa!
            </p>

             <button
            onClick={() => {
              localStorage.removeItem("quizComplete");
              localStorage.removeItem("memoryComplete");
              localStorage.removeItem("hangmanComplete");
              
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 bg-pink-500 text-white border-2 border-white rounded hover:scale-105 transition font-pixel"
          >
            Recomeçar Jogo
          </button>
          </div>

         
        </div>
      )}
    </div>
  );
}
