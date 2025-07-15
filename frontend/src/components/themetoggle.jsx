import React, { useEffect, useState } from 'react'

let styleNode = null

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    // Remove previous theme style
    if (styleNode && styleNode.parentNode) {
      styleNode.parentNode.removeChild(styleNode)
    }

    // Load CSS content manually using require()
    let cssContent = ''
    if (theme === 'dark') {
      cssContent = require('../dindex.css').default
    } else {
      cssContent = require('../index.css').default
    }

    // Inject CSS into a <style> tag
    styleNode = document.createElement('style')
    styleNode.innerText = cssContent
    document.head.appendChild(styleNode)

    // Save theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        marginLeft: '10px',
      }}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  )
}

export default ThemeToggle
