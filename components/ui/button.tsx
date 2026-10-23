import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-[3px] border-ink font-semibold text-ink shadow-[5px_5px_0_var(--color-ink)] outline-none transition-[transform,box-shadow,background-color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0_var(--color-ink)] focus-visible:ring-4 focus-visible:ring-blue/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        mint: 'bg-mint',
        sun: 'bg-sun',
        coral: 'bg-coral',
        white: 'bg-white',
        ink: 'bg-ink text-white shadow-[5px_5px_0_var(--color-sun)] hover:shadow-[7px_7px_0_var(--color-sun)]',
      },
      size: {
        default: 'h-12 px-6 text-[15px]',
        lg: 'h-14 px-8 text-base sm:h-16 sm:px-9 sm:text-lg',
        sm: 'h-11 px-5 text-[15px]',
      },
    },
    defaultVariants: { variant: 'mint', size: 'default' },
  },
)

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
