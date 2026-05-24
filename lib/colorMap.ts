// Map of color names (lowercase) → hex code
// Covers Apple product colors and common colors
export const COLOR_MAP: Record<string, string> = {
  // iPhone 16
  'black':             '#1c1c1e',
  'white':             '#f5f5f7',
  'pink':              '#f2a7b0',
  'teal':              '#4a9b8e',
  'ultramarine':       '#3a5fa0',

  // iPhone 16 Pro / Pro Max titanium
  'black titanium':    '#3a3a3c',
  'white titanium':    '#f0ede8',
  'natural titanium':  '#b5a898',
  'desert titanium':   '#c8b89a',

  // iPhone 17
  'lavender':          '#c8b8d8',
  'sage':              '#8fad88',
  'mist blue':         '#8ab4c8',

  // iPhone 17 Pro / Pro Max
  'cosmic orange':     '#e8722a',
  'deep blue':         '#2c5f8a',
  'silver':            '#e8e8e8',
  'orange':            '#e8722a',
  'white / silver':    '#e8e8e8',
  'blue':              '#2c5f8a',

  // MacBook
  'midnight':          '#1c1c1e',
  'starlight':         '#e8e0d0',
  'space gray':        '#86868b',
  'space grey':        '#86868b',
  'gold':              '#f0d090',
  'sky blue':          '#87ceeb',

  // iPad
  'yellow':            '#ffd54f',
  'purple':            '#9b59b6',
  'red':               '#e74c3c',
  'green':             '#4caf50',

  // Apple Watch
  'midnight aluminum': '#1c1c1e',
  'starlight aluminum':'#e8e0d0',
  'product red':       '#e74c3c',

  // Common
  'gray':              '#86868b',
  'grey':              '#86868b',
  'dark':              '#1c1c1e',
  'light':             '#f5f5f7',
  'rose gold':         '#e8b4a0',
  'coral':             '#ff6b6b',
  'cyan':              '#00bcd4',
  'indigo':            '#3f51b5',
  'violet':            '#8b5cf6',
  'brown':             '#795548',
  'beige':             '#f5f0e8',
  'cream':             '#fffdd0',
  'navy':              '#1a237e',
  'forest':            '#2e7d32',
  'mint':              '#98ff98',
  'peach':             '#ffcba4',
  'lilac':             '#c8a2c8',
  'graphite':          '#4a4a4a',
  'titanium':          '#b5a898',
}

/**
 * Returns hex color code for a given color name, or empty string if not found.
 * Case-insensitive, trims whitespace.
 */
export function getColorCode(name: string): string {
  const key = name.trim().toLowerCase()
  // Exact match
  if (COLOR_MAP[key]) return COLOR_MAP[key]
  // Partial match — find first key that includes the input
  const partial = Object.keys(COLOR_MAP).find(k => k.includes(key) || key.includes(k))
  return partial ? COLOR_MAP[partial] : ''
}
