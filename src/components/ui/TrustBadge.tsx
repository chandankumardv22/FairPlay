import { motion } from 'framer-motion'
import { HiOutlineShieldCheck } from 'react-icons/hi2'
import { MdOutlineBalance, MdOutlineBlock, MdOutlineVerified } from 'react-icons/md'
import { TbArrowsShuffle } from 'react-icons/tb'

const BADGES = [
  {
    icon: HiOutlineShieldCheck,
    text: 'Powered by Secure Random Generation',
  },
  {
    icon: MdOutlineBalance,
    text: 'Equal Probability for Every Player',
  },
  {
    icon: MdOutlineBlock,
    text: 'No Duplicate Assignments',
  },
  {
    icon: TbArrowsShuffle,
    text: 'No Player Bias',
  },
  {
    icon: MdOutlineVerified,
    text: 'Fair & Transparent Selection',
  },
] as const

type TrustBadgeProps = {
  compact?: boolean
  className?: string
}

export function TrustBadge({ compact = false, className = '' }: TrustBadgeProps) {
  const items = compact ? BADGES.slice(0, 3) : BADGES

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={[
        'glass rounded-2xl p-4 sm:p-5',
        className,
      ].join(' ')}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
        Fairness Guarantee
      </p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.li
              key={item.text}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-700 dark:text-brand-300">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span>
                <span className="mr-1.5 font-semibold text-brand-700 dark:text-brand-300">✔</span>
                {item.text}
              </span>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}
