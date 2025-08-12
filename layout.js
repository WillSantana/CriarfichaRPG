import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Scroll, Swords, Shield, Users, Dice6 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Personagens",
    url: createPageUrl("Characters"),
    icon: Users,
  },
  {
    title: "Criar Ficha",
    url: createPageUrl("CreateCharacter"),
    icon: Scroll,
  },
  {
    title: "Gerador Aleatório",
    url: createPageUrl("RandomGenerator"),
    icon: Dice6,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --medieval-brown: #8B4513;
            --medieval-gold: #DAA520;
            --parchment: #F5F5DC;
            --dark-brown: #654321;
            --light-gold: #F4E4BC;
            --text-dark: #2F2F2F;
          }
          
          body {
            background: linear-gradient(135deg, var(--parchment) 0%, #F0E6D2 100%);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .medieval-card {
            background: linear-gradient(145deg, #FEFCF8 0%, var(--parchment) 100%);
            border: 2px solid var(--medieval-gold);
            box-shadow: 0 8px 32px rgba(139, 69, 19, 0.1);
          }
          
          .medieval-button {
