// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./assets/components/Start";
import Principal from "./assets/components/Principal";
import Login from "./assets/components/Login";
import DesafioQuiz from "./assets/components/DesafioQuiz";
import DesafioMemoria from "./assets/components/DesafioMemoria";
import DesafioForca from "./assets/components/DesafioForca";
import MusicaFundo from "./assets/components/MusicaFundo";

export default function App() {
  return (
    <Router>
       <MusicaFundo />
      <Routes>
        
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/DesafioQuiz" element={<DesafioQuiz />} />
        <Route path="/DesafioMemoria" element={<DesafioMemoria />} />
        <Route path="/DesafioForca" element={<DesafioForca />} />
      </Routes>
    </Router>
  );
}
