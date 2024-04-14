import { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({
  children,
  className,
  ...props
}: {
  className?: string
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
