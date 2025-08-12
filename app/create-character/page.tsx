"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Dice6, Calculator, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Tipos de dados
interface Character {
  // Básico
  name: string
  player: string
  race: string
  character_class: string
  level: number
  alignment: string
  experience: number
  subrace: string
  subclass: string
  background: string

  // Atributos
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number

  // Combate
  armor_class: number
  hit_points_max: number
  hit_points_current: number
  hit_points_temp: number
  initiative: number
  speed: number
  proficiency_bonus: number

  // Habilidades
  skills: Record<string, number>
}

// Dados das habilidades D&D 5e
const SKILLS = [
  { name: "Acrobacia", attribute: "dexterity", description: "Agilidade, reflexos e equilíbrio" },
  { name: "Arcanismo", attribute: "intelligence", description: "Conhecimento sobre magia" },
  { name: "Atletismo", attribute: "strength", description: "Força física e resistência" },
  { name: "Atuação", attribute: "charisma", description: "Habilidade de entreter" },
  { name: "Blefe", attribute: "charisma", description: "Enganar e mentir" },
  { name: "Furtividade", attribute: "dexterity", description: "Mover-se silenciosamente" },
  { name: "História", attribute: "intelligence", description: "Conhecimento histórico" },
  { name: "Insight", attribute: "wisdom", description: "Perceber intenções" },
  { name: "Intimidação", attribute: "charisma", description: "Ameaçar e coagir" },
  { name: "Investigação", attribute: "intelligence", description: "Encontrar pistas" },
  { name: "Lidar com Animais", attribute: "wisdom", description: "Interagir com animais" },
  { name: "Medicina", attribute: "wisdom", description: "Curar ferimentos" },
  { name: "Natureza", attribute: "intelligence", description: "Conhecimento natural" },
  { name: "Percepção", attribute: "wisdom", description: "Notar detalhes" },
  { name: "Persuasão", attribute: "charisma", description: "Convencer outros" },
  { name: "Prestidigitação", attribute: "dexterity", description: "Truques manuais" },
  { name: "Religião", attribute: "intelligence", description: "Conhecimento religioso" },
  { name: "Sobrevivência", attribute: "wisdom", description: "Sobreviver na natureza" },
]

// Ícones para atributos
const ATTRIBUTE_ICONS = {
  strength: "💪",
  dexterity: "🏹",
  constitution: "❤️",
  intelligence: "🧠",
  wisdom: "👁️",
  charisma: "✨",
}

const ATTRIBUTE_NAMES = {
  strength: "Força",
  dexterity: "Destreza",
  constitution: "Constituição",
  intelligence: "Inteligência",
  wisdom: "Sabedoria",
  charisma: "Carisma",
}

const ATTRIBUTE_DESCRIPTIONS = {
  strength: "Poder físico e capacidade atlética",
  dexterity: "Agilidade, reflexos e equilíbrio",
  constitution: "Saúde, resistência e vitalidade",
  intelligence: "Raciocínio, memória e conhecimento",
  wisdom: "Percepção, intuição e sensatez",
  charisma: "Força de personalidade e liderança",
}

export default function CreateCharacterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [saving, setSaving] = useState(false)

  const [character, setCharacter] = useState<Character>({
    // Básico
    name: "",
    player: "",
    race: "",
    character_class: "",
    level: 1,
    alignment: "",
    experience: 0,
    subrace: "",
    subclass: "",
    background: "",

    // Atributos
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,

    // Combate
    armor_class: 10,
    hit_points_max: 8,
    hit_points_current: 8,
    hit_points_temp: 0,
    initiative: 0,
    speed: 30,
    proficiency_bonus: 2,

    // Habilidades
    skills: {},
  })

  // Calcular modificador de atributo
  const getModifier = (value: number) => {
    return Math.floor((value - 10) / 2)
  }

  // Calcular bônus de proficiência baseado no nível
  useEffect(() => {
    const proficiencyBonus = Math.ceil(character.level / 4) + 1
    setCharacter((prev) => ({ ...prev, proficiency_bonus: proficiencyBonus }))
  }, [character.level])

  // Rolar 4d6, descartar menor
  const rollAttribute = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
    rolls.sort((a, b) => b - a)
    return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0)
  }

  // Rolar todos os atributos
  const rollAllAttributes = () => {
    setCharacter((prev) => ({
      ...prev,
      strength: rollAttribute(),
      dexterity: rollAttribute(),
      constitution: rollAttribute(),
      intelligence: rollAttribute(),
      wisdom: rollAttribute(),
      charisma: rollAttribute(),
    }))
  }

  // Array padrão
  const useStandardArray = () => {
    setCharacter((prev) => ({
      ...prev,
      strength: 15,
      dexterity: 14,
      constitution: 13,
      intelligence: 12,
      wisdom: 10,
      charisma: 8,
    }))
  }

  // Resetar atributos
  const resetAttributes = () => {
    setCharacter((prev) => ({
      ...prev,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    }))
  }

  // Calcular pontos gastos (point buy)
  const getPointCost = (value: number) => {
    if (value <= 13) return value - 8
    if (value === 14) return 7
    if (value === 15) return 9
    return 0
  }

  const totalPointsUsed = [
    character.strength,
    character.dexterity,
    character.constitution,
    character.intelligence,
    character.wisdom,
    character.charisma,
  ].reduce((total, value) => total + getPointCost(value), 0)

  // Atualizar personagem
  const updateCharacter = (field: keyof Character, value: any) => {
    setCharacter((prev) => ({ ...prev, [field]: value }))
  }

  // Atualizar habilidade
  const updateSkill = (skillName: string, value: number) => {
    setCharacter((prev) => ({
      ...prev,
      skills: { ...prev.skills, [skillName]: value },
    }))
  }

  // Salvar personagem
  const handleSave = async () => {
    if (!character.name.trim()) {
      alert("Por favor, informe o nome do personagem.")
      return
    }

    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Personagem salvo:", character)
      router.push("/")
    } catch (error) {
      console.error("Erro ao salvar personagem:", error)
      alert("Erro ao salvar personagem. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-6xl mx-auto">
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
              onClick={() => router.push("/")}
              className="border-amber-400 hover:bg-amber-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-amber-900 tracking-tight">📋 Ficha do Personagem</h1>
              <p className="text-amber-700">Configure sua ficha de personagem D&D</p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || !character.name.trim()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Personagem
              </>
            )}
          </Button>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-amber-100 border-2 border-amber-300">
              <TabsTrigger value="basic" className="data-[state=active]:bg-amber-200">
                Básico
              </TabsTrigger>
              <TabsTrigger value="attributes" className="data-[state=active]:bg-amber-200">
                Atributos
              </TabsTrigger>
              <TabsTrigger value="combat" className="data-[state=active]:bg-amber-200">
                Combate
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-amber-200">
                Habilidades
              </TabsTrigger>
            </TabsList>

            {/* Aba Básico */}
            <TabsContent value="basic">
              <div className="space-y-6">
                {/* Informações Essenciais */}
                <Card className="border-2 border-amber-300 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-amber-200 to-orange-200 border-b-2 border-amber-300">
                    <CardTitle className="flex items-center gap-2 text-amber-900">👤 Informações Essenciais</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-amber-800 font-medium">Nome do Personagem *</Label>
                        <Input
                          value={character.name}
                          onChange={(e) => updateCharacter("name", e.target.value)}
                          placeholder="Ex: Aragorn, Legolas..."
                          className="mt-2 border-amber-300 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <Label className="text-amber-800 font-medium">Nome do Jogador</Label>
                        <Input
                          value={character.player}
                          onChange={(e) => updateCharacter("player", e.target.value)}
                          placeholder="Seu nome"
                          className="mt-2 border-amber-300 focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detalhes do Personagem */}
                <Card className="border-2 border-amber-300 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-amber-200 to-orange-200 border-b-2 border-amber-300">
                    <CardTitle className="flex items-center gap-2 text-amber-900">👑 Detalhes do Personagem</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <Label className="text-amber-800 font-medium">👑 Raça *</Label>
                        <Select value={character.race} onValueChange={(value) => updateCharacter("race", value)}>
                          <SelectTrigger className="mt-2 border-amber-300">
                            <SelectValue placeholder="Selecione a raça" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Humano">Humano</SelectItem>
                            <SelectItem value="Elfo">Elfo</SelectItem>
                            <SelectItem value="Anão">Anão</SelectItem>
                            <SelectItem value="Halfling">Halfling</SelectItem>
                            <SelectItem value="Meio-elfo">Meio-elfo</SelectItem>
                            <SelectItem value="Meio-orc">Meio-orc</SelectItem>
                            <SelectItem value="Gnomo">Gnomo</SelectItem>
                            <SelectItem value="Tiefling">Tiefling</SelectItem>
                            <SelectItem value="Draconato">Draconato</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-amber-800 font-medium">⚔️ Classe *</Label>
                        <Select
                          value={character.character_class}
                          onValueChange={(value) => updateCharacter("character_class", value)}
                        >
                          <SelectTrigger className="mt-2 border-amber-300">
                            <SelectValue placeholder="Selecione a classe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Barbaro">Bárbaro</SelectItem>
                            <SelectItem value="Bardo">Bardo</SelectItem>
                            <SelectItem value="Bruxo">Bruxo</SelectItem>
                            <SelectItem value="Clérigo">Clérigo</SelectItem>
                            <SelectItem value="Druida">Druida</SelectItem>
                            <SelectItem value="Feiticeiro">Feiticeiro</SelectItem>
                            <SelectItem value="Guerreiro">Guerreiro</SelectItem>
                            <SelectItem value="Ladino">Ladino</SelectItem>
                            <SelectItem value="Mago">Mago</SelectItem>
                            <SelectItem value="Monge">Monge</SelectItem>
                            <SelectItem value="Paladino">Paladino</SelectItem>
                            <SelectItem value="Ranger">Ranger</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-amber-800 font-medium">⭐ Nível</Label>
                        <Input
                          type="number"
                          min="1"
                          max="20"
                          value={character.level}
                          onChange={(e) => updateCharacter("level", Number.parseInt(e.target.value) || 1)}
                          className="mt-2 border-amber-300 focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-amber-800 font-medium">⚖️ Alinhamento</Label>
                        <Select
                          value={character.alignment}
                          onValueChange={(value) => updateCharacter("alignment", value)}
                        >
                          <SelectTrigger className="mt-2 border-amber-300">
                            <SelectValue placeholder="Selecione o alinhamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Leal e Bom">Leal e Bom</SelectItem>
                            <SelectItem value="Neutro e Bom">Neutro e Bom</SelectItem>
                            <SelectItem value="Caótico e Bom">Caótico e Bom</SelectItem>
                            <SelectItem value="Leal e Neutro">Leal e Neutro</SelectItem>
                            <SelectItem value="Neutro">Neutro</SelectItem>
                            <SelectItem value="Caótico e Neutro">Caótico e Neutro</SelectItem>
                            <SelectItem value="Leal e Mau">Leal e Mau</SelectItem>
                            <SelectItem value="Neutro e Mau">Neutro e Mau</SelectItem>
                            <SelectItem value="Caótico e Mau">Caótico e Mau</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-amber-800 font-medium">🎯 Experiência (XP)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={character.experience}
                          onChange={(e) => updateCharacter("experience", Number.parseInt(e.target.value) || 0)}
                          className="mt-2 border-amber-300 focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Campos Específicos D&D 5.0 */}
                <Card className="border-2 border-emerald-300 shadow-lg bg-emerald-50">
                  <CardHeader className="bg-gradient-to-r from-emerald-200 to-teal-200 border-b-2 border-emerald-300">
                    <CardTitle className="flex items-center gap-2 text-emerald-900">
                      📚 Campos Específicos D&D 5.0
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-emerald-800 font-medium">Sub-raça</Label>
                        <Input
                          value={character.subrace}
                          onChange={(e) => updateCharacter("subrace", e.target.value)}
                          placeholder="Ex: Alto Elfo, Anão da Montanha..."
                          className="mt-2 border-emerald-300 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <Label className="text-emerald-800 font-medium">Subclasse</Label>
                        <Input
                          value={character.subclass}
                          onChange={(e) => updateCharacter("subclass", e.target.value)}
                          placeholder="Ex: Campeão, Escola de Evocação..."
                          className="mt-2 border-emerald-300 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <Label className="text-emerald-800 font-medium">Antecedente</Label>
                        <Input
                          value={character.background}
                          onChange={(e) => updateCharacter("background", e.target.value)}
                          placeholder="Ex: Acólito, Criminoso..."
                          className="mt-2 border-emerald-300 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dica */}
                <Card className="border-2 border-yellow-300 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <p className="text-yellow-800 font-medium">Dica:</p>
                        <p className="text-yellow-700 text-sm">
                          Preencha as informações básicas (Nome, Raça e Classe) para habilitar as próximas abas.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba Atributos */}
            <TabsContent value="attributes">
              <div className="space-y-6">
                {/* Controles dos Atributos */}
                <Card className="border-2 border-amber-300 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-amber-200 to-orange-200 border-b-2 border-amber-300">
                    <CardTitle className="flex items-center justify-between text-amber-900">
                      <span className="flex items-center gap-2">⚡ Atributos do Personagem</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={rollAllAttributes}
                          className="border-amber-400 hover:bg-amber-100 bg-transparent"
                        >
                          <Dice6 className="w-4 h-4 mr-1" />
                          Rolar 4d6
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={useStandardArray}
                          className="border-amber-400 hover:bg-amber-100 bg-transparent"
                        >
                          Array Padrão
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetAttributes}
                          className="border-amber-400 hover:bg-amber-100 bg-transparent"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Resetar (10)
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-4 text-sm">
                      <Badge variant="outline" className="border-yellow-400 text-yellow-700">
                        💡 Array Padrão: 15, 14, 13, 12, 10, 8
                      </Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-700">
                        Pontos Gastos: {totalPointsUsed}/27
                      </Badge>
                    </div>

                    {/* Grid de Atributos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(ATTRIBUTE_NAMES).map(([key, name]) => {
                        const value = character[key as keyof Character] as number
                        const modifier = getModifier(value)
                        const icon = ATTRIBUTE_ICONS[key as keyof typeof ATTRIBUTE_ICONS]
                        const description = ATTRIBUTE_DESCRIPTIONS[key as keyof typeof ATTRIBUTE_DESCRIPTIONS]

                        return (
                          <Card
                            key={key}
                            className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50"
                          >
                            <CardContent className="p-4 text-center">
                              <div className="text-3xl mb-2">{icon}</div>
                              <h3 className="font-bold text-amber-900 mb-1">{name}</h3>
                              <p className="text-xs text-amber-700 mb-4 h-8">{description}</p>

                              <div className="mb-3">
                                <Label className="text-sm font-medium text-amber-800">Valor</Label>
                                <Input
                                  type="number"
                                  min="3"
                                  max="20"
                                  value={value}
                                  onChange={(e) =>
                                    updateCharacter(key as keyof Character, Number.parseInt(e.target.value) || 10)
                                  }
                                  className="mt-1 text-center border-amber-300 focus:border-amber-500 font-bold text-lg"
                                />
                              </div>

                              <div className="bg-amber-100 rounded-lg p-2">
                                <Label className="text-sm font-medium text-amber-800">Modificador</Label>
                                <div className="text-2xl font-bold text-amber-900">
                                  {modifier >= 0 ? "+" : ""}
                                  {modifier}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    {/* Resumo dos Atributos */}
                    <Card className="mt-6 border-2 border-gray-300 bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-gray-800 text-lg">📊 Resumo dos Atributos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                          {Object.entries(ATTRIBUTE_NAMES).map(([key, name]) => {
                            const value = character[key as keyof Character] as number
                            const modifier = getModifier(value)
                            return (
                              <div key={key} className="bg-white rounded-lg p-3 border">
                                <div className="font-bold text-gray-800 text-sm">{name.slice(0, 3).toUpperCase()}</div>
                                <div className="text-lg font-bold">
                                  {value} ({modifier >= 0 ? "+" : ""}
                                  {modifier})
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Dicas para Distribuição */}
                    <Card className="mt-6 border-2 border-yellow-300 bg-yellow-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">💡</span>
                          <div>
                            <p className="text-yellow-800 font-medium mb-2">Dicas para Distribuição de Atributos</p>
                            <ul className="text-yellow-700 text-sm space-y-1">
                              <li>
                                • <strong>Guerreiros/Paladinos:</strong> Priorize Força ou Destreza
                              </li>
                              <li>
                                • <strong>Magos/Feiticeiros:</strong> Foque em Inteligência ou Carisma
                              </li>
                              <li>
                                • <strong>Clérigos/Druidas:</strong> Sabedoria é fundamental
                              </li>
                              <li>
                                • <strong>Ladinos/Rangers:</strong> Destreza é sua principal habilidade
                              </li>
                              <li>
                                • <strong>Constituição:</strong> Importante para todos (mais HP e resistência)
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba Combate */}
            <TabsContent value="combat">
              <div className="space-y-6">
                <Card className="border-2 border-red-300 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-200 to-pink-200 border-b-2 border-red-300">
                    <CardTitle className="flex items-center justify-between text-red-900">
                      <span className="flex items-center gap-2">⚔️ Estatísticas de Combate</span>
                      <Button variant="outline" size="sm" className="border-red-400 hover:bg-red-100 bg-transparent">
                        <Calculator className="w-4 h-4 mr-1" />
                        Calcular Automaticamente
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-red-700 mb-6">Configure as estatísticas de combate do seu personagem</p>

                    {/* Estatísticas Principais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {/* Classe de Armadura */}
                      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl mb-2">🛡️</div>
                          <h3 className="font-bold text-blue-900 mb-1">Classe de Armadura</h3>
                          <p className="text-xs text-blue-700 mb-4">Dificuldade para ser atingido</p>

                          <Input
                            type="number"
                            min="1"
                            value={character.armor_class}
                            onChange={(e) => updateCharacter("armor_class", Number.parseInt(e.target.value) || 10)}
                            className="text-center border-blue-300 focus:border-blue-500 font-bold text-lg"
                          />
                        </CardContent>
                      </Card>

                      {/* Pontos de Vida Máximos */}
                      <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl mb-2">❤️</div>
                          <h3 className="font-bold text-red-900 mb-1">Pontos de Vida Máximos</h3>
                          <p className="text-xs text-red-700 mb-4">Sua capacidade total de dano</p>

                          <Input
                            type="number"
                            min="1"
                            value={character.hit_points_max}
                            onChange={(e) => {
                              const newMax = Number.parseInt(e.target.value) || 8
                              updateCharacter("hit_points_max", newMax)
                              if (character.hit_points_current > newMax) {
                                updateCharacter("hit_points_current", newMax)
                              }
                            }}
                            className="text-center border-red-300 focus:border-red-500 font-bold text-lg"
                          />
                        </CardContent>
                      </Card>

                      {/* Pontos de Vida Atuais */}
                      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl mb-2">💚</div>
                          <h3 className="font-bold text-green-900 mb-1">Pontos de Vida Atuais</h3>
                          <p className="text-xs text-green-700 mb-4">Seus HP atuais</p>

                          <Input
                            type="number"
                            min="0"
                            max={character.hit_points_max}
                            value={character.hit_points_current}
                            onChange={(e) =>
                              updateCharacter("hit_points_current", Number.parseInt(e.target.value) || 0)
                            }
                            className="text-center border-green-300 focus:border-green-500 font-bold text-lg"
                          />
                        </CardContent>
                      </Card>

                      {/* Iniciativa */}
                      <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl mb-2">⚡</div>
                          <h3 className="font-bold text-yellow-900 mb-1">Iniciativa</h3>
                          <p className="text-xs text-yellow-700 mb-4">Bônus na ordem de combate</p>

                          <Input
                            type="number"
                            value={character.initiative}
                            onChange={(e) => updateCharacter("initiative", Number.parseInt(e.target.value) || 0)}
                            className="text-center border-yellow-300 focus:border-yellow-500 font-bold text-lg"
                          />
                        </CardContent>
                      </Card>

                      {/* Velocidade */}
                      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl mb-2">🏃</div>
                          <h3 className="font-bold text-purple-900 mb-1">Velocidade</h3>
                          <p className="text-xs text-purple-700 mb-4">Movimento em pés por turno</p>

                          <Input
                            type="number"
                            min="0"
                            value={character.speed}
                            onChange={(e) => updateCharacter("speed", Number.parseInt(e.target.value) || 30)}
                            className="text-center border-purple-300 focus:border-purple-500 font-bold text-lg"
                          />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Pontos de Vida Temporários */}
                    <Card className="border-2 border-cyan-200 bg-cyan-50 mb-6">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">💙</div>
                          <div className="flex-1">
                            <Label className="text-cyan-800 font-medium">Pontos de Vida Temporários</Label>
                            <p className="text-xs text-cyan-600 mb-2">HP temporários não se acumulam com cura normal</p>
                            <Input
                              type="number"
                              min="0"
                              value={character.hit_points_temp}
                              onChange={(e) => updateCharacter("hit_points_temp", Number.parseInt(e.target.value) || 0)}
                              className="border-cyan-300 focus:border-cyan-500"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Bônus de Proficiência D&D 5.0 */}
                    <Card className="border-2 border-emerald-300 bg-emerald-50">
                      <CardHeader>
                        <CardTitle className="text-emerald-900 text-lg flex items-center gap-2">
                          🎯 D&D 5.0 - Bônus de Proficiência
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div>
                            <Label className="text-emerald-800 font-medium">Bônus de Proficiência</Label>
                            <p className="text-xs text-emerald-600 mb-2">Calculado automaticamente baseado no nível</p>
                          </div>
                          <div className="bg-emerald-100 rounded-lg p-3 border-2 border-emerald-300">
                            <div className="text-2xl font-bold text-emerald-900">+{character.proficiency_bonus}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Resumo de Combate */}
                    <Card className="mt-6 border-2 border-gray-300 bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-gray-800 text-lg">🛡️ Resumo de Combate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="font-bold text-gray-800 text-sm">CA</div>
                            <div className="text-xl font-bold">{character.armor_class}</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="font-bold text-gray-800 text-sm">HP</div>
                            <div className="text-xl font-bold">
                              {character.hit_points_current}/{character.hit_points_max}
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="font-bold text-gray-800 text-sm">Iniciativa</div>
                            <div className="text-xl font-bold">
                              {character.initiative >= 0 ? "+" : ""}
                              {character.initiative}
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="font-bold text-gray-800 text-sm">Velocidade</div>
                            <div className="text-xl font-bold">{character.speed} pés</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba Habilidades */}
            <TabsContent value="skills">
              <div className="space-y-6">
                <Card className="border-2 border-indigo-300 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-200 to-purple-200 border-b-2 border-indigo-300">
                    <CardTitle className="flex items-center gap-2 text-indigo-900">🎯 Habilidades e Perícias</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-indigo-700 mb-6">Configure as habilidades e perícias do seu personagem</p>

                    {/* Lista de Habilidades */}
                    <div className="space-y-3">
                      {SKILLS.map((skill) => {
                        const attributeValue = character[skill.attribute as keyof Character] as number
                        const attributeModifier = getModifier(attributeValue)
                        const skillBonus = character.skills[skill.name] || 0
                        const totalModifier = attributeModifier + skillBonus
                        const attributeName = ATTRIBUTE_NAMES[skill.attribute as keyof typeof ATTRIBUTE_NAMES]

                        return (
                          <Card
                            key={skill.name}
                            className="border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <h4 className="font-semibold text-indigo-900">{skill.name}</h4>
                                    <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-600">
                                      {attributeName}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-indigo-600 mt-1">{skill.description}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="text-center">
                                    <Label className="text-xs text-indigo-700">Bônus</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="10"
                                      value={skillBonus}
                                      onChange={(e) => updateSkill(skill.name, Number.parseInt(e.target.value) || 0)}
                                      className="w-16 text-center border-indigo-300 focus:border-indigo-500"
                                    />
                                  </div>

                                  <div className="bg-indigo-100 rounded-lg p-2 min-w-[60px] text-center border border-indigo-300">
                                    <div className="text-xs text-indigo-700">Total</div>
                                    <div className="font-bold text-indigo-900">
                                      {totalModifier >= 0 ? "+" : ""}
                                      {totalModifier}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    {/* Resumo das Habilidades */}
                    <Card className="mt-6 border-2 border-gray-300 bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-gray-800 text-lg">📊 Resumo das Habilidades</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="font-bold text-gray-800 text-sm">Proficiências</div>
                            <div className="text-xl font-bold">
                              {Object.values(character.skills).filter((bonus) => bonus > 0).length}
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="font-bold text-gray-800 text-sm">Bônus Médio</div>
                            <div className="text-xl font-bold">
                              {Object.values(character.skills).length > 0
                                ? Math.round(
                                    Object.values(character.skills).reduce((a, b) => a + b, 0) /
                                      Object.values(character.skills).length,
                                  )
                                : 0}
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="font-bold text-gray-800 text-sm">Bônus Total</div>
                            <div className="text-xl font-bold">
                              +{Object.values(character.skills).reduce((a, b) => a + b, 0)}
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="font-bold text-gray-800 text-sm">Especializada</div>
                            <div className="text-xl font-bold">
                              {
                                Object.values(character.skills).filter((bonus) => bonus >= character.proficiency_bonus)
                                  .length
                              }
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
