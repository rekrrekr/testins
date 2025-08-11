import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import React from 'react';

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-teal/60 active:scale-98 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bloom-hover rounded-[var(--radius-lg)] bg-electric-teal/20 text-electric-teal hover:bg-electric-teal/25',
        secondary: 'bloom-hover rounded-[var(--radius-md)] bg-white/10 text-white hover:bg-white/15',
        ghost: 'rounded-[var(--radius-md)] text-white/80 hover:bg-white/5',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = 'Button';