import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'cricket'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  children: ReactNode
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  isLoading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500 disabled:bg-brand-600/50',
  secondary:
    'glass text-slate-800 hover:bg-white/90 dark:text-slate-100 dark:hover:bg-white/10',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/5',
  danger:
    'bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500 disabled:bg-rose-600/50',
  cricket:
    'bg-pitch-700 text-white shadow-lg shadow-pitch-700/30 hover:bg-pitch-600 disabled:bg-pitch-700/50',
}

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-11 h-11 px-3.5 text-sm rounded-xl',
  md: 'min-h-12 h-12 px-5 text-base sm:h-11 sm:text-sm rounded-2xl',
  lg: 'min-h-12 h-12 px-6 text-base rounded-2xl sm:min-h-[3.25rem] sm:h-13 sm:px-7',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      disabled={disabled || isLoading}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-colors',
        'touch-manipulation select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-surface-50 dark:focus-visible:ring-offset-surface-950',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      ) : null}
      {children}
    </motion.button>
  )
}

export type { ButtonHTMLAttributes }
