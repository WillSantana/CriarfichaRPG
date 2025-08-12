import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import CharactersPage from "./pages/CharactersPage"
import CreateCharacterPage from "./pages/CreateCharacterPage"
import RandomGeneratorPage from "./pages/RandomGeneratorPage"
import "./index.css"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/create-character" element={<CreateCharacterPage />} />
          <Route path="/random-generator" element={<RandomGeneratorPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
