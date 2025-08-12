"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Dice6 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { motion } from "framer-motion"

export default function CreateCharacterPage() {
  const navigate = useNavigate()
  const [character, setCharacter] = useState({
    name: "",
    player: "",
    edition: "dnd5e",
    race: "",
    character_class: "",
    level: 1,
    alignment: "",
    experience: 0,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    armor_class: 10,
    hit_points_max: 8,
    hit_points_current: 8,
    hit_points_temp: 0,
    initiative: 0,
    speed: 30,
    proficiency_bonus: 2,
    base_attack_bonus: 0,
    skills: {},
    saving_throws: {},
    spells: [],
    equipment: [],
  })

  const [saving, setSaving] = useState(false)

  const updateCharacter = (field, value) => {
    setCharacter((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    if (!character.name.trim()) {
      alert("Por favor, informe o nome do personagem.")
      return
    }

    setSaving(true)
    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Personagem salvo:", character)
      navigate("/characters")
    } catch (error) {
      console.error("Erro ao salvar personagem:", error)
      alert("Erro ao salvar personagem. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/characters")}
              className="border-medieval-gold hover:bg-light-gold"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-text-dark tracking-tight">Criar Novo Personagem</h1>
              <p className="text-medieval-brown">Configure sua ficha de personagem D&D</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-medieval-brown">
              <Dice6 className="w-4 h-4" />
              <span className="font-medium">{character.edition === "dnd35" ? "D&D 3.5" : "D&D 5.0"}</span>
            </div>
            <Button
              onClick={handleSave}
              disabled={saving || !character.name.trim()}
              className="medieval-button rounded-xl px-6 py-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-text-dark border-t-transparent"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Personagem
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="medieval-card shadow-xl">
            <CardHeader className="bg-gradient-to-r from-medieval-gold to-light-gold border-b-2 border-medieval-brown">
              <CardTitle className="text-xl font-bold text-text-dark flex items-center gap-2">
                <Dice6 className="w-5 h-5" />
                Ficha do Personagem
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-medieval-brown mb-2">Nome do Personagem *</label>
                  <input
                    type="text"
                    value={character.name}
                    onChange={(e) => updateCharacter("name", e.target.value)}
                    placeholder="Ex: Aragorn, Legolas..."
                    className="w-full px-3 py-2 border border-medieval-gold rounded-md focus:outline-none focus:ring-2 focus:ring-medieval-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-medieval-brown mb-2">Nome do Jogador</label>
                  <input
                    type="text"
                    value={character.player}
                    onChange={(e) => updateCharacter("player", e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-3 py-2 border border-medieval-gold rounded-md focus:outline-none focus:ring-2 focus:ring-medieval-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-medieval-brown mb-2">Raça *</label>
                  <select
                    value={character.race}
                    onChange={(e) => updateCharacter("race", e.target.value)}
                    className="w-full px-3 py-2 border border-medieval-gold rounded-md focus:outline-none focus:ring-2 focus:ring-medieval-gold"
                  >
                    <option value="">Selecione a raça</option>
                    <option value="Humano">Humano</option>
                    <option value="Elfo">Elfo</option>
                    <option value="Anão">Anão</option>
                    <option value="Halfling">Halfling</option>
                    <option value="Meio-elfo">Meio-elfo</option>
                    <option value="Meio-orc">Meio-orc</option>
                    <option value="Gnomo">Gnomo</option>
                    <option value="Tiefling">Tiefling</option>
                    <option value="Draconato">Draconato</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-medieval-brown mb-2">Classe *</label>
                  <select
                    value={character.character_class}
                    onChange={(e) => updateCharacter("character_class", e.target.value)}
                    className="w-full px-3 py-2 border border-medieval-gold rounded-md focus:outline-none focus:ring-2 focus:ring-medieval-gold"
                  >
                    <option value="">Selecione a classe</option>
                    <option value="Barbaro">Bárbaro</option>
                    <option value="Bardo">Bardo</option>
                    <option value="Bruxo">Bruxo</option>
                    <option value="Clérigo">Clérigo</option>
                    <option value="Druida">Druida</option>
                    <option value="Feiticeiro">Feiticeiro</option>
                    <option value="Guerreiro">Guerreiro</option>
                    <option value="Ladino">Ladino</option>
                    <option value="Mago">Mago</option>
                    <option value="Monge">Monge</option>
                    <option value="Paladino">Paladino</option>
                    <option value="Ranger">Ranger</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-medieval-brown mb-2">Nível</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={character.level}
                    onChange={(e) => updateCharacter("level", Number.parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-medieval-gold rounded-md focus:outline-none focus:ring-2 focus:ring-medieval-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-medieval-brown mb-2">Alinhamento</label>
                  <select
                    value={character.alignment}
                    onChange={(e) => updateCharacter("alignment", e.target.value)}
                    className="w-full px-3 py-2 border border-medieval-gold rounded-md focus:outline-none focus:ring-2 focus:ring-medieval-gold"
                  >
                    <option value="">Selecione o alinhamento</option>
                    <option value="Leal e Bom">Leal e Bom</option>
                    <option value="Neutro e Bom">Neutro e Bom</option>
                    <option value="Caótico e Bom">Caótico e Bom</option>
                    <option value="Leal e Neutro">Leal e Neutro</option>
                    <option value="Neutro">Neutro</option>
                    <option value="Caótico e Neutro">Caótico e Neutro</option>
                    <option value="Leal e Mau">Leal e Mau</option>
                    <option value="Neutro e Mau">Neutro e Mau</option>
                    <option value="Caótico e Mau">Caótico e Mau</option>
                  </select>
                </div>
              </div>

              {/* Attributes Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Atributos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: "strength", name: "Força" },
                    { key: "dexterity", name: "Destreza" },
                    { key: "constitution", name: "Constituição" },
                    { key: "intelligence", name: "Inteligência" },
                    { key: "wisdom", name: "Sabedoria" },
                    { key: "charisma", name: "Carisma" },
                  ].map((attr) => (
                    <div key={attr.key}>
                      <label className="block text-sm font-medium text-medieval-brown mb-2">{attr.name}</label>
                      <input
                        type="number"
                        min="3"
                        max="20"
                        value={character[attr.key]}
                        onChange={(e) => updateCharacter(attr.key, Number.parseInt(e.target.value) || 10)}
                        className="w-full px-3 py-2 border border-medieval-gold rounded-md focus:outline-none focus:ring-2 focus:ring-medieval-gold text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
