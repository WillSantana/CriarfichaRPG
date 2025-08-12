"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  Trophy,
  Star,
  Play,
  Volume2,
  VolumeX,
  CheckCircle,
  Circle,
  Award,
  Gamepad2,
  Brain,
  Users,
  Clock,
  Lightbulb,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Lesson {
  id: number
  title: string
  description: string
  duration: number
  completed: boolean
  points: number
  activities: Activity[]
}

interface Activity {
  id: number
  type: "quiz" | "interactive" | "video" | "reading"
  title: string
  content: string
  options?: string[]
  correctAnswer?: number
  completed: boolean
}

const mockLessons: Lesson[] = [
  {
    id: 1,
    title: "Introdução à Didática Inclusiva",
    description: "Fundamentos e princípios básicos da educação inclusiva",
    duration: 15,
    completed: false,
    points: 100,
    activities: [
      {
        id: 1,
        type: "reading",
        title: "O que é Didática Inclusiva?",
        content:
          "A didática inclusiva é uma abordagem educacional que busca atender às necessidades de todos os estudantes, independentemente de suas diferenças individuais.",
        completed: false,
      },
      {
        id: 2,
        type: "quiz",
        title: "Quiz: Conceitos Básicos",
        content: "Qual é o principal objetivo da didática inclusiva?",
        options: [
          "Ensinar apenas estudantes com deficiência",
          "Atender às necessidades de todos os estudantes",
          "Usar apenas tecnologia na educação",
          "Focar apenas em estudantes avançados",
        ],
        correctAnswer: 1,
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Aprendizagem Baseada em Projetos",
    description: "Como implementar projetos práticos no ensino",
    duration: 20,
    completed: false,
    points: 150,
    activities: [
      {
        id: 3,
        type: "interactive",
        title: "Planejando um Projeto",
        content: "Vamos criar um projeto educacional passo a passo",
        completed: false,
      },
      {
        id: 4,
        type: "quiz",
        title: "Benefícios dos Projetos",
        content: "Qual NÃO é um benefício da aprendizagem baseada em projetos?",
        options: [
          "Maior engajamento dos estudantes",
          "Aprendizagem mais memorística",
          "Desenvolvimento de habilidades práticas",
          "Trabalho em equipe",
        ],
        correctAnswer: 1,
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Gamificação na Educação",
    description: "Elementos de jogos para motivar o aprendizado",
    duration: 18,
    completed: false,
    points: 120,
    activities: [
      {
        id: 5,
        type: "interactive",
        title: "Elementos de Gamificação",
        content: "Explore diferentes elementos que tornam o aprendizado mais divertido",
        completed: false,
      },
    ],
  },
]

export default function EducacaoInclusivaPage() {
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)
  const [currentActivity, setCurrentActivity] = useState<number>(0)
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons)
  const [userProgress, setUserProgress] = useState({
    totalPoints: 0,
    completedLessons: 0,
    currentStreak: 0,
    level: 1,
  })
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const totalLessons = lessons.length
  const progressPercentage = (userProgress.completedLessons / totalLessons) * 100

  const playSound = (type: "success" | "error" | "click") => {
    if (!audioEnabled) return
    // Simular sons (em um projeto real, usaria arquivos de áudio)
    console.log(`🔊 Som: ${type}`)
  }

  const completeActivity = (lessonId: number, activityId: number, correct?: boolean) => {
    setLessons((prev) =>
      prev.map((lesson) => {
        if (lesson.id === lessonId) {
          const updatedActivities = lesson.activities.map((activity) => {
            if (activity.id === activityId) {
              return { ...activity, completed: true }
            }
            return activity
          })

          const allActivitiesCompleted = updatedActivities.every((a) => a.completed)

          return {
            ...lesson,
            activities: updatedActivities,
            completed: allActivitiesCompleted,
          }
        }
        return lesson
      }),
    )

    if (correct !== false) {
      playSound("success")
      setUserProgress((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints + 25,
        currentStreak: prev.currentStreak + 1,
      }))
    } else {
      playSound("error")
    }
  }

  const startLesson = (lessonId: number) => {
    setCurrentLesson(lessonId)
    setCurrentActivity(0)
    playSound("click")
  }

  const nextActivity = () => {
    const lesson = lessons.find((l) => l.id === currentLesson)
    if (lesson && currentActivity < lesson.activities.length - 1) {
      setCurrentActivity((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      // Lição completa
      setCurrentLesson(null)
      setUserProgress((prev) => ({
        ...prev,
        completedLessons: prev.completedLessons + 1,
        level: Math.floor((prev.completedLessons + 1) / 2) + 1,
      }))
    }
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const lesson = lessons.find((l) => l.id === currentLesson)
    const activity = lesson?.activities[currentActivity]

    if (activity?.type === "quiz") {
      const isCorrect = answerIndex === activity.correctAnswer
      setTimeout(() => {
        completeActivity(currentLesson!, activity.id, isCorrect)
        setTimeout(nextActivity, 1500)
      }, 1000)
    }
  }

  const currentLessonData = lessons.find((l) => l.id === currentLesson)
  const currentActivityData = currentLessonData?.activities[currentActivity]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Header com Progresso */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                🎓 Didática Inclusiva
              </h1>
              <p className="text-gray-600 text-lg">Aprenda metodologias educacionais inclusivas de forma interativa</p>
            </div>

            <Button
              onClick={() => setAudioEnabled(!audioEnabled)}
              variant="outline"
              size="icon"
              className="border-purple-300 hover:bg-purple-50"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>

          {/* Dashboard de Progresso */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8" />
                  <div>
                    <p className="text-sm opacity-90">Pontos</p>
                    <p className="text-2xl font-bold">{userProgress.totalPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <p className="text-sm opacity-90">Lições</p>
                    <p className="text-2xl font-bold">
                      {userProgress.completedLessons}/{totalLessons}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8" />
                  <div>
                    <p className="text-sm opacity-90">Sequência</p>
                    <p className="text-2xl font-bold">{userProgress.currentStreak}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <p className="text-sm opacity-90">Nível</p>
                    <p className="text-2xl font-bold">{userProgress.level}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Barra de Progresso Geral */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Conteúdo Principal */}
        <AnimatePresence mode="wait">
          {currentLesson === null ? (
            /* Lista de Lições */
            <motion.div
              key="lessons-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid gap-6"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card
                      className={`h-full transition-all duration-300 hover:shadow-xl ${
                        lesson.completed
                          ? "bg-gradient-to-br from-green-50 to-green-100 border-green-300"
                          : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                              {lesson.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                              {lesson.title}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.duration} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            <span>{lesson.points} pts</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {lesson.activities.map((activity) => (
                              <Badge
                                key={activity.id}
                                variant={activity.completed ? "default" : "secondary"}
                                className={activity.completed ? "bg-green-500" : ""}
                              >
                                {activity.type === "quiz" && "❓"}
                                {activity.type === "interactive" && "🎮"}
                                {activity.type === "video" && "🎥"}
                                {activity.type === "reading" && "📖"}
                                {activity.title}
                              </Badge>
                            ))}
                          </div>

                          <Button
                            onClick={() => startLesson(lesson.id)}
                            className={`w-full ${
                              lesson.completed
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            }`}
                            disabled={lesson.completed}
                          >
                            {lesson.completed ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Concluída
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Iniciar Lição
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Seção de Metodologias */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Brain className="w-6 h-6" />
                      Metodologias Inclusivas
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-8 h-8" />
                        </div>
                        <h4 className="font-semibold mb-2">Projetos Práticos</h4>
                        <p className="text-sm opacity-90">Aprendizagem baseada em projetos reais</p>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Gamepad2 className="w-8 h-8" />
                        </div>
                        <h4 className="font-semibold mb-2">Gamificação</h4>
                        <p className="text-sm opacity-90">Elementos de jogos no aprendizado</p>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-8 h-8" />
                        </div>
                        <h4 className="font-semibold mb-2">Multi-sensorial</h4>
                        <p className="text-sm opacity-90">Múltiplos canais de aprendizagem</p>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Lightbulb className="w-8 h-8" />
                        </div>
                        <h4 className="font-semibold mb-2">Micro-lições</h4>
                        <p className="text-sm opacity-90">Conteúdo em pequenas doses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ) : (
            /* Visualização da Lição */
            <motion.div
              key="lesson-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="max-w-4xl mx-auto">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl font-bold">{currentLessonData?.title}</CardTitle>
                      <p className="opacity-90 mt-1">
                        Atividade {currentActivity + 1} de {currentLessonData?.activities.length}
                      </p>
                    </div>
                    <Button
                      onClick={() => setCurrentLesson(null)}
                      variant="outline"
                      className="bg-white text-blue-600 border-white hover:bg-gray-100"
                    >
                      Voltar
                    </Button>
                  </div>

                  <Progress
                    value={((currentActivity + 1) / (currentLessonData?.activities.length || 1)) * 100}
                    className="mt-4 bg-white bg-opacity-20"
                  />
                </CardHeader>

                <CardContent className="p-8">
                  {currentActivityData && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentActivityData.title}</h3>
                        <p className="text-lg text-gray-600 mb-6">{currentActivityData.content}</p>
                      </div>

                      {currentActivityData.type === "quiz" && currentActivityData.options && (
                        <div className="space-y-3">
                          {currentActivityData.options.map((option, index) => (
                            <motion.button
                              key={index}
                              onClick={() => !showFeedback && handleQuizAnswer(index)}
                              disabled={showFeedback}
                              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                                selectedAnswer === index
                                  ? showFeedback
                                    ? index === currentActivityData.correctAnswer
                                      ? "bg-green-100 border-green-500 text-green-800"
                                      : "bg-red-100 border-red-500 text-red-800"
                                    : "bg-blue-100 border-blue-500 text-blue-800"
                                  : showFeedback && index === currentActivityData.correctAnswer
                                    ? "bg-green-100 border-green-500 text-green-800"
                                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                              }`}
                              whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                              whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                                    selectedAnswer === index && showFeedback
                                      ? index === currentActivityData.correctAnswer
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "bg-red-500 border-red-500 text-white"
                                      : showFeedback && index === currentActivityData.correctAnswer
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-gray-400"
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span className="flex-1">{option}</span>
                                {showFeedback && (
                                  <>
                                    {index === currentActivityData.correctAnswer && (
                                      <CheckCircle className="w-5 h-5 text-green-600" />
                                    )}
                                    {selectedAnswer === index && index !== currentActivityData.correctAnswer && (
                                      <Circle className="w-5 h-5 text-red-600" />
                                    )}
                                  </>
                                )}
                              </div>
                            </motion.button>
                          ))}

                          {showFeedback && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-4 rounded-lg ${
                                selectedAnswer === currentActivityData.correctAnswer
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {selectedAnswer === currentActivityData.correctAnswer ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-5 h-5" />
                                  <span className="font-semibold">Correto! +25 pontos</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Circle className="w-5 h-5" />
                                  <span className="font-semibold">Não foi dessa vez. Tente novamente!</span>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </div>
                      )}

                      {currentActivityData.type === "reading" && (
                        <div className="text-center">
                          <Button
                            onClick={() => {
                              completeActivity(currentLesson!, currentActivityData.id)
                              setTimeout(nextActivity, 500)
                            }}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Continuar
                          </Button>
                        </div>
                      )}

                      {currentActivityData.type === "interactive" && (
                        <div className="text-center">
                          <Button
                            onClick={() => {
                              completeActivity(currentLesson!, currentActivityData.id)
                              setTimeout(nextActivity, 500)
                            }}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                          >
                            <Gamepad2 className="w-4 h-4 mr-2" />
                            Iniciar Atividade Interativa
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
