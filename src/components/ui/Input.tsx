import { type InputHTMLAttributes, forwardRef } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, hint, error, className = '', id, ...props }, ref) {
    const inputId = id ?? props.name

    return (
      <label className="flex w-full flex-col gap-1.5">
        {label ? (
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {label}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={[
            // text-base (16px) prevents iOS zoom on focus
            'h-12 w-full rounded-2xl border px-4 text-base outline-none transition sm:h-11 sm:text-sm',
            'bg-white/70 border-slate-200 text-slate-900 placeholder:text-slate-400',
            'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
            'dark:bg-white/5 dark:border-white/10 dark:text-slate-100 dark:placeholder:text-slate-500',
            'dark:focus:border-brand-400 dark:focus:ring-brand-400/20',
            error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {error ? (
          <span className="text-xs font-medium text-rose-500">{error}</span>
        ) : hint ? (
          <span className="text-xs text-slate-500 dark:text-slate-400">{hint}</span>
        ) : null}
      </label>
    )
  },
)
