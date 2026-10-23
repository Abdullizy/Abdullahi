import * as React from 'react'

import { cn } from '@/lib/utils'

const field =
  'w-full rounded-2xl border-2 border-ink bg-white px-4 text-base text-ink outline-none transition-shadow placeholder:text-muted/70 focus:shadow-[4px_4px_0_var(--color-blue)] disabled:cursor-not-allowed disabled:opacity-50'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(field, 'h-[52px]', className)} {...props} />
}

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(field, 'min-h-28 resize-none py-3.5', className)} {...props} />
}

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return <label data-slot="label" className={cn('flex flex-col gap-2 text-[13px] font-semibold', className)} {...props} />
}

export { Input, Textarea, Label }
