import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode,
  className?: string,
  variant?: 'primary' | 'secondary' | 'ghost' | "none" | 'nav' | 'destructive' | 'outline',
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
}

export const Button = ({ children, className, variant = 'primary', onClick, disabled = false }: ButtonProps) => {
  const variants: Record<string, string> = {
    "primary": "bg-[var(--primary)] text-[#ffff]",
    "secondary": "bg-[var(--secondary)] text-[var(--foreground)]",
    "ghost": "bg-transparent border-4 border-[var(--secondary)] text-[var(--foreground)] ",
    "nav": "bg-transparent text-[var(--foreground)] hover:bg-[#77777725] !rounded-full active:bg-[#77777750]",
    "destructive": "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
    "outline": "border text-foreground hover:bg-[#d6d6d641] hover:text-accent-foreground"
  }

  return (
    <button
      className={clsx(className, variants[variant], 'hover:brightness-120 active:brightness-75 disabled:brightness-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 rounded-xl', 'flex items-center justify-center px-4 py-2 gap-2')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
