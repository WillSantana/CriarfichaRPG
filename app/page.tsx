"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, User, Swords, Shield, Crown, Scroll, Dice6, Search, Edit3, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

// Mock data - em um projeto real, isso viria de uma API
const mockCharacters = [
  {
    id: 1,
    name: "Aragorn",
    player: "João Silva",
    edition: "dnd5e",
    race: "Humano",
    character_class: "Ranger",
    level: 5,
    alignment: "Leal e Bom",
    strength: 16,
    dexterity: 14,
    constitution: 15,
    intelligence: 12,
    wisdom: 13,
    charisma: 11,
    armor_class: 16,
    hit_points_max: 45,
    hit_points_current: 45,
    created_date: new Date("2024-01-15"),
  },
  {
    id: 2,
    name: "Legolas",
    player: "Maria Santos",
    edition: "dnd5e",
    race: "Elfo",
    character_class: "Ranger",
    level: 4,
    alignment: "Caótico e Bom",
    strength: 12,
    dexterity: 18,
    constitution: 13,
    intelligence: 14,
    wisdom: 15,
    charisma: 12,
    armor_class: 15,
    hit_points_max: 32,
    hit_points_current: 28,
    created_date: new Date("2024-01-10"),
  },
  {
    id: 3,
    name: "Gimli",
    player: "Pedro Costa",
    edition: "dnd35",
    race: "Anão",
    character_class: "Guerreiro",
    level: 6,
    alignment: "Leal e Neutro",
    strength: 18,
    dexterity: 10,
    constitution: 16,
    intelligence: 11,
    wisdom: 12,
    charisma: 8,
    armor_class: 18,
    hit_points_max: 54,
    hit_points_current: 54,
    created_date: new Date("2024-01-05"),
  },
]

function CharacterCard({ character, index }: { character: any; index: number }) {
  const getEditionBadge = (edition: string) => {
    return edition === "dnd35" ? "D&D 3.5" : "D&D 5.0"
  }

  const getEditionColor = (edition: string) => {
    return edition === "dnd35"
      ? "bg-amber-100 text-amber-800 border-amber-300"
      : "bg-emerald-100 text-emerald-800 border-emerald-300"
  }

  const getModifier = (stat: number) => {
    const mod = Math.floor((stat - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="medieval-card hover:shadow-xl transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-text-dark mb-1 group-hover:text-medieval-brown transition-colors">
                {character.name || "Sem Nome"}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-medieval-brown">
                <User className="w-4 h-4" />
                <span>{character.player || "Jogador Anônimo"}</span>
              </div>
            </div>
            <Badge className={`${getEditionColor(character.edition)} border font-medium`}>
              {getEditionBadge(character.edition)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Character Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-medieval-gold" />
              <span className="text-text-dark">
                <strong>Raça:</strong> {character.race || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-medieval-brown" />
              <span className="text-text-dark">
                <strong>Classe:</strong> {character.character_class || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Dice6 className="w-4 h-4 text-purple-600" />
              <span className="text-text-dark">
                <strong>Nível:</strong> {character.level || 1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="text-text-dark">
                <strong>HP:</strong> {character.hit_points_current || 0}/{character.hit_points_max || 8}
              </span>
            </div>
          </div>

          {/* Attributes */}
          <div className="border-t border-medieval-gold pt-3">
            <h4 className="text-sm font-semibold text-medieval-brown mb-2">Atributos Principais</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-gradient-to-b from-light-gold to-parchment rounded-lg border border-medieval-gold">
                <div className="font-bold text-medieval-brown">FOR</div>
                <div className="text-text-dark font-semibold">
                  {character.strength || 10} ({getModifier(character.strength || 10)})
                </div>
              </div>
              <div className="text-center p-2 bg-gradient-to-b from-light-gold to-parchment rounded-lg border border-medieval-gold">
                <div className="font-bold text-medieval-brown">DES</div>
                <div className="text-text-dark font-semibold">
                  {character.dexterity || 10} ({getModifier(character.dexterity || 10)})
                </div>
              </div>
              <div className="text-center p-2 bg-gradient-to-b from-light-gold to-parchment rounded-lg border border-medieval-gold">
                <div className="font-bold text-medieval-brown">CON</div>
                <div className="text-text-dark font-semibold">
                  {character.constitution || 10} ({getModifier(character.constitution || 10)})
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Link href="/create-character" className="flex-1">
              <Button className="w-full medieval-button rounded-lg text-sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </Link>
            <Button variant="outline" className="px-3 border-medieval-gold hover:bg-light-gold bg-transparent">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function EmptyState({ searchTerm, hasCharacters }: { searchTerm: string; hasCharacters: boolean }) {
  if (searchTerm && hasCharacters) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <Card className="medieval-card max-w-md mx-auto">
          <CardContent className="p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-medieval-gold to-light-gold rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-medieval-brown" />
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-2">Nenhum resultado encontrado</h3>
            <p className="text-medieval-brown mb-4">
              Não encontramos personagens com o termo "{searchTerm}". Tente buscar por outro nome, raça ou classe.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
      <Card className="medieval-card max-w-lg mx-auto">
        <CardContent className="p-12">
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-medieval-gold to-light-gold rounded-full flex items-center justify-center shadow-lg">
              <Scroll className="w-12 h-12 text-medieval-brown" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-medieval-brown rounded-full flex items-center justify-center">
              <Dice6 className="w-4 h-4 text-parchment" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-text-dark mb-3">Sua aventura começa aqui!</h3>
          <p className="text-medieval-brown mb-6 text-lg leading-relaxed">
            Você ainda não possui nenhum personagem. Crie sua primeira ficha e comece a explorar mundos fantásticos!
          </p>

          <Link href="/create-character">
            <Button className="medieval-button rounded-xl px-8 py-3 text-lg shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Criar Primeiro Personagem
            </Button>
          </Link>

          <div className="mt-8 text-sm text-medieval-brown opacity-75">
            <p>💡 Dica: Você pode criar personagens para D&D 3.5 e D&D 5.0</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function CharactersPage() {
  const [characters] = useState(mockCharacters)
  const [searchTerm, setSearchTerm] = useState("")
  const [editionFilter, setEditionFilter] = useState("all")
  const [classFilter, setClassFilter] = useState("all")

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch =
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.race?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.character_class?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEdition = editionFilter === "all" || character.edition === editionFilter
    const matchesClass = classFilter === "all" || character.character_class === classFilter

    return matchesSearch && matchesEdition && matchesClass
  })

  const uniqueClasses = [...new Set(characters.map((c) => c.character_class).filter(Boolean))]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-text-dark mb-2 tracking-tight">Seus Personagens</h1>
            <p className="text-medieval-brown text-lg">Gerencie suas fichas de personagem D&D</p>
          </div>
          <Link href="/create-character">
            <Button className="medieval-button rounded-xl px-6 py-3 text-lg shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Novo Personagem
            </Button>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="medieval-card border-l-4 border-l-medieval-gold">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-medieval-gold bg-opacity-20 rounded-lg">
                  <User className="w-5 h-5 text-medieval-brown" />
                </div>
                <div>
                  <p className="text-sm text-medieval-brown font-medium">Total</p>
                  <p className="text-2xl font-bold text-text-dark">{characters.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medieval-card border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Scroll className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-medieval-brown font-medium">D&D 5.0</p>
                  <p className="text-2xl font-bold text-text-dark">
                    {characters.filter((c) => c.edition === "dnd5e").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medieval-card border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Crown className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-medieval-brown font-medium">D&D 3.5</p>
                  <p className="text-2xl font-bold text-text-dark">
                    {characters.filter((c) => c.edition === "dnd35").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medieval-card border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Dice6 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-medieval-brown font-medium">Nível Médio</p>
                  <p className="text-2xl font-bold text-text-dark">
                    {characters.length > 0
                      ? Math.round(characters.reduce((sum, c) => sum + (c.level || 1), 0) / characters.length)
                      : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        {characters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="medieval-card p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medieval-brown w-4 h-4" />
                  <Input
                    placeholder="Buscar personagens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-medieval-gold focus:ring-medieval-gold"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Select value={editionFilter} onValueChange={setEditionFilter}>
                  <SelectTrigger className="w-32 border-medieval-gold">
                    <SelectValue placeholder="Edição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="dnd5e">D&D 5.0</SelectItem>
                    <SelectItem value="dnd35">D&D 3.5</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-32 border-medieval-gold">
                    <SelectValue placeholder="Classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {uniqueClasses.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Characters Grid */}
        {filteredCharacters.length === 0 ? (
          <EmptyState searchTerm={searchTerm} hasCharacters={characters.length > 0} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCharacters.map((character, index) => (
                <CharacterCard key={character.id} character={character} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
