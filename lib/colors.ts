export type Color = 'coral' | 'sun' | 'blue' | 'mint' | 'pink' | 'violet'

export const hex: Record<Color, string> = {
  coral: '#ff5b3a',
  sun: '#ffc400',
  blue: '#2d5bff',
  mint: '#12c48b',
  pink: '#ff4fa3',
  violet: '#8b5cf6',
}

// Full class names (Tailwind needs to see them written out).
export const bg: Record<Color, string> = {
  coral: 'bg-coral',
  sun: 'bg-sun',
  blue: 'bg-blue text-white',
  mint: 'bg-mint',
  pink: 'bg-pink',
  violet: 'bg-violet',
}

export const palette = [hex.coral, hex.sun, hex.blue, hex.mint, hex.pink, hex.violet]
