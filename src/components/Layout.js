"use client"
import { Link, useLocation } from "react-router-dom"
import { Scroll, Users, Dice6, Menu, X } from "lucide-react"
import { useState } from "react"

const navigationItems = [
  {
    title: "Personagens",
    url: "/characters",
    icon: Users,
  },
  {
    title: "Criar Ficha",
    url: "/create-character",
    icon: Scroll,
  },
  {
    title: "Gerador Aleatório",
    url: "/random-generator",
    icon: Dice6,
  },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment to-amber-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-medieval-gold text-text-dark rounded-lg shadow-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-medieval-brown to-dark-brown text-parchment transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-medieval-gold">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-medieval-gold rounded-lg flex items-center justify-center">
                <Scroll className="w-6 h-6 text-medieval-brown" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SF-RPG</h1>
                <p className="text-sm opacity-75">Sistema RPG</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.url

                return (
                  <li key={item.url}>
                    <Link
                      to={item.url}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-medieval-gold text-medieval-brown font-semibold"
                          : "hover:bg-medieval-gold hover:bg-opacity-20 hover:text-medieval-gold"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-medieval-gold">
            <div className="text-center text-sm opacity-75">
              <p>© 2024 SF-RPG</p>
              <p>Sistema de Fichas RPG</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  )
}
