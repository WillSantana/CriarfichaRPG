"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dice6, Shuffle, User, MapPin, Gem, Scroll, Copy, RefreshCw, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function RandomGeneratorPage() {
  const [lastResults, setLastResults] = useState<any[]>([])
  const [isRolling, setIsRolling] = useState(false)

  const rollDice = (sides: number) => Math.floor(Math.random() * sides) + 1

  const rollOnTable = async (tableName: string) => {
    setIsRolling(true)

    // Simulate dice rolling animation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let result

    if (tableName === "names") {
      const names = ["Aragorn", "Legolas", "Gimli", "Gandalf", "Boromir", "Faramir", "Éowyn", "Arwen"]
      const randomName = names[Math.floor(Math.random() * names.length)]
      result = {
        table: "Nomes Aleatórios",
        roll: rollDice(8),
        result: randomName,
        timestamp: new Date(),
      }
    } else if (tableName === "locations") {
      const locations = [
        "Vila isolada cercada por pântanos",
        "Cidade mercantil em cruzamento de estradas",
        "Mosteiro nas montanhas nevadas",
        "Ruínas antigas com estátuas quebradas",
        "Aldeia de pescadores em ilha rochosa",
      ]
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      result = {
        table: "Locais Aleatórios",
        roll: rollDice(20),
        result: randomLocation,
        timestamp: new Date(),
      }
    } else if (tableName === "treasures") {
      const treasures = [
        "2d6 × 10 PO + objeto sentimental",
        "1d4 gemas (50 PO cada) + mapa rasgado",
        "Arma +1 (ou equivalente mágico)",
        "Armadura leve encantada (+1 CA)",
        "Poção de cura (ou 2d4 poções menores)",
      ]
      const randomTreasure = treasures[Math.floor(Math.random() * treasures.length)]
      result = {
        table: "Tesouros Aleatórios",
        roll: rollDice(12),
        result: randomTreasure,
        timestamp: new Date(),
      }
    }

    setLastResults((prev) => [result, ...prev.slice(0, 9)])
    setIsRolling(false)
  }

  const clearHistory = () => {
    setLastResults([])
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-dark mb-3 tracking-tight">🎲 Gerador Aleatório Universal</h1>
          <p className="text-lg text-medieval-brown mb-4">
            Sistema completo de geração para RPGs - D&D, Pathfinder, OSR e mais!
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge className="bg-emerald-100 text-emerald-800">D&D 5.0</Badge>
            <Badge className="bg-amber-100 text-amber-800">D&D 3.5</Badge>
            <Badge className="bg-purple-100 text-purple-800">Pathfinder</Badge>
            <Badge className="bg-blue-100 text-blue-800">OSR</Badge>
            <Badge className="bg-red-100 text-red-800">Universal</Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Generator */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Names Generator */}
              <Card className="medieval-card">
                <CardHeader className="bg-gradient-to-r from-medieval-gold to-light-gold border-b-2 border-medieval-brown">
                  <CardTitle className="text-lg font-bold text-text-dark flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Nomes Aleatórios
                  </CardTitle>
                  <Badge className="bg-medieval-brown text-parchment font-bold w-fit">d100</Badge>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-medieval-brown mb-4">
                    Gere nomes para personagens de diferentes raças e culturas
                  </p>
                  <Button
                    onClick={() => rollOnTable("names")}
                    disabled={isRolling}
                    className="w-full medieval-button rounded-lg"
                  >
                    <AnimatePresence mode="wait">
                      {isRolling ? (
                        <motion.div
                          key="rolling"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          exit={{ rotate: 0 }}
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Dice6 className="w-4 h-4 mr-2" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="static"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Shuffle className="w-4 h-4" />
                          Rolar d100
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </CardContent>
              </Card>

              {/* Locations Generator */}
              <Card className="medieval-card">
                <CardHeader className="bg-gradient-to-r from-medieval-gold to-light-gold border-b-2 border-medieval-brown">
                  <CardTitle className="text-lg font-bold text-text-dark flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Locais Aleatórios
                  </CardTitle>
                  <Badge className="bg-medieval-brown text-parchment font-bold w-fit">d20</Badge>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-medieval-brown mb-4">Crie locais interessantes para suas aventuras</p>
                  <Button
                    onClick={() => rollOnTable("locations")}
                    disabled={isRolling}
                    className="w-full medieval-button rounded-lg"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Rolar d20
                  </Button>
                </CardContent>
              </Card>

              {/* Treasures Generator */}
              <Card className="medieval-card">
                <CardHeader className="bg-gradient-to-r from-medieval-gold to-light-gold border-b-2 border-medieval-brown">
                  <CardTitle className="text-lg font-bold text-text-dark flex items-center gap-2">
                    <Gem className="w-5 h-5" />
                    Tesouros Aleatórios
                  </CardTitle>
                  <Badge className="bg-medieval-brown text-parchment font-bold w-fit">d12</Badge>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-medieval-brown mb-4">
                    Determine recompensas e tesouros para os aventureiros
                  </p>
                  <Button
                    onClick={() => rollOnTable("treasures")}
                    disabled={isRolling}
                    className="w-full medieval-button rounded-lg"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Rolar d12
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-1">
            <Card className="medieval-card sticky top-6">
              <CardHeader className="bg-gradient-to-r from-medieval-brown to-dark-brown text-parchment border-b-2 border-medieval-gold">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Scroll className="w-5 h-5" />
                    Histórico
                  </CardTitle>
                  <Badge className="bg-medieval-gold text-text-dark font-bold">{lastResults.length}/10</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                {lastResults.length === 0 ? (
                  <div className="text-center py-8 text-medieval-brown">
                    <Scroll className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      Nenhuma rolagem ainda.
                      <br />
                      Use os geradores acima!
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-medieval-gold hover:bg-light-gold text-xs bg-transparent"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copiar Tudo
                      </Button>
                      <Button
                        onClick={clearHistory}
                        variant="outline"
                        size="sm"
                        className="border-red-300 hover:bg-red-50 text-red-600 text-xs bg-transparent"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Results List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      <AnimatePresence>
                        {lastResults.map((result, index) => (
                          <motion.div
                            key={result.timestamp.getTime()}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gradient-to-r from-parchment to-light-gold border border-medieval-gold rounded-lg p-3 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-text-dark text-sm">{result.table}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-medieval-gold hover:text-text-dark"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-medieval-brown text-parchment text-xs">{result.roll}</Badge>
                              </div>
                              <div className="text-sm text-text-dark font-medium">{result.result}</div>
                            </div>

                            <div className="flex items-center gap-1 mt-2 text-xs text-medieval-brown opacity-75">
                              <span>{result.timestamp.toLocaleTimeString()}</span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="medieval-card bg-gradient-to-r from-medieval-gold to-light-gold">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-text-dark mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Ações Rápidas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  onClick={() => rollOnTable("names")}
                  className="medieval-button rounded-lg"
                  disabled={isRolling}
                >
                  <User className="w-4 h-4 mr-2" />
                  Nome Rápido
                </Button>
                <Button
                  onClick={() => rollOnTable("locations")}
                  className="medieval-button rounded-lg"
                  disabled={isRolling}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Local Rápido
                </Button>
                <Button
                  onClick={() => rollOnTable("treasures")}
                  className="medieval-button rounded-lg"
                  disabled={isRolling}
                >
                  <Gem className="w-4 h-4 mr-2" />
                  Tesouro Rápido
                </Button>
                <Button className="medieval-button rounded-lg" disabled={isRolling}>
                  <Scroll className="w-4 h-4 mr-2" />
                  Aventura Completa
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Card className="border-amber-300 bg-amber-50">
            <CardContent className="p-6">
              <h4 className="font-bold text-amber-800 mb-3">💡 Como Usar o Gerador</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-amber-700">
                <div>
                  <h5 className="font-semibold mb-2">Para Mestres:</h5>
                  <ul className="space-y-1">
                    <li>• Use antes da sessão para preparar</li>
                    <li>• Role durante o jogo para improvisar</li>
                    <li>• Combine tabelas para histórias completas</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Para Jogadores:</h5>
                  <ul className="space-y-1">
                    <li>• Gere nomes para personagens</li>
                    <li>• Crie histórico com personalidade</li>
                    <li>• Invente NPCs e aliados</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Criação de Mundos:</h5>
                  <ul className="space-y-1">
                    <li>• Gere região: 3 locais + 2 tesouros</li>
                    <li>• Adicione 1 ruína + 1 evento</li>
                    <li>• Pronto: área de aventura!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
