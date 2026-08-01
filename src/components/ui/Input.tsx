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
          <span className="text-sm font-medium text-slate-200">
            {label}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={[
            'h-12 w-full rounded-2xl border px-4 text-base outline-none transition sm:h-11 sm:text-sm',
            'border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500',
            'focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20',
            error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {error ? (
          <span className="text-xs font-medium text-rose-400">{error}</span>
        ) : hint ? (
          <span className="text-xs text-slate-400">{hint}</span>
        ) : null}
      </label>
    )
  },
)
