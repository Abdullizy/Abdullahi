import Image from 'next/image'
import type { Project } from '@/lib/data'
import { bg } from '@/lib/colors'
import { cn } from '@/lib/utils'

const dots = (
  <div className="flex gap-1.5">
    <i className="size-2.5 rounded-full border-2 border-ink bg-white" />
    <i className="size-2.5 rounded-full border-2 border-ink bg-white" />
    <i className="size-2.5 rounded-full border-2 border-ink bg-white" />
  </div>
)
const box = 'rounded-[14px] border-2 border-ink'

/** The project screenshot, or a colourful sketch until you add one. */
export function Preview({ project, index = 0, className, sizes = '(min-width:1024px) 620px, 90vw', priority = false }: { project: Project; index?: number; className?: string; sizes?: string; priority?: boolean }) {
  if (project.image) {
    return (
      <div className={cn('pop-card relative overflow-hidden rounded-[28px] bg-soft', className)}>
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    )
  }
  const v = index % 4
  return (
    <div className={cn('pop-card flex flex-col gap-3 overflow-hidden rounded-[28px] p-5 sm:gap-3.5 sm:p-7', bg[project.color], className)}>
      {dots}
      {v === 0 && (<><div className={cn(box, 'h-[28%] bg-white')} /><div className="flex flex-1 gap-3.5"><div className={cn(box, 'flex-[2] bg-sun')} /><div className={cn(box, 'flex-1 bg-white')} /></div></>)}
      {v === 1 && (<><div className="flex flex-1 gap-3.5"><div className={cn(box, 'flex-1 bg-white')} /><div className={cn(box, 'flex-[2] bg-mint')} /></div><div className={cn(box, 'h-[22%] bg-sun')} /></>)}
      {v === 2 && (<><div className={cn(box, 'h-[16%] bg-white')} /><div className="flex flex-1 gap-3.5"><div className={cn(box, 'flex-1 bg-pink')} /><div className={cn(box, 'flex-1 bg-white')} /><div className={cn(box, 'flex-1 bg-violet')} /></div></>)}
      {v === 3 && (<><div className={cn(box, 'h-[34%] bg-white')} /><div className="flex flex-1 gap-3.5"><div className={cn(box, 'flex-[3] bg-violet')} /><div className={cn(box, 'flex-1 bg-white')} /></div></>)}
    </div>
  )
}
