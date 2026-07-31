import { motion } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi2'

type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="glass relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 dark:text-slate-200"
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -40, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      >
        {isDark ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
      </motion.span>
    </motion.button>
  )
}
