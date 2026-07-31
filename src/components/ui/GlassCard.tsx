import { type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type GlassCardProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  strong?: boolean
  hoverLift?: boolean
  className?: string
}

export function GlassCard({
  children,
  strong = false,
  hoverLift = false,
  className = '',
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hoverLift
          ? { y: -6, transition: { type: 'spring', stiffness: 400, damping: 24 } }
          : undefined
      }
      className={[
        strong ? 'glass-strong' : 'glass',
        'rounded-3xl',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.div>
  )
}
