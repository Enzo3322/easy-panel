import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Função para combinar classes do Tailwind de forma otimizada
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatador de data para exibição
export function formatDate(dateString: string, options: Intl.DateTimeFormatOptions = {}) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options
  }).format(date)
}

// Truncar texto com ellipsis
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

// Verifica se está no ambiente server-side
export function isServer() {
  return typeof window === 'undefined'
}

// Gera cores com base em string (útil para avatares)
export function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}

// Formatar string para título (primeira letra maiúscula)
export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  )
}
