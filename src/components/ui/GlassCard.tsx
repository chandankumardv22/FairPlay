import { type ReactNode, useEffect, useState } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type GlassCardProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  strong?: boolean
  hoverLift?: boolean
  className?: string
}

function useFinePointerHover() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return enabled
}

export function GlassCard({
  children,
  strong = false,
  hoverLift = false,
  className = '',
  ...props
}: GlassCardProps) {
  const canHover = useFinePointerHover()

  return (
    <motion.div
      whileHover={
        hoverLift && canHover
          ? { y: -6, transition: { type: 'spring', stiffness: 400, damping: 24 } }
          : undefined
      }
      whileTap={hoverLift ? { scale: 0.985 } : undefined}
      className={[strong ? 'glass-strong' : 'glass', 'rounded-3xl', className].join(' ')}
      {...props}
    >
      {children}
    </motion.div>
  )
}
