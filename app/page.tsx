import { DoorHero } from '@/components/site/door-hero'
import { Ribbons } from '@/components/site/ribbons'
import { Services } from '@/components/site/services'
import { Work } from '@/components/site/work'
import { Process } from '@/components/site/process'
import { About } from '@/components/site/about'
import { Testimonial } from '@/components/site/testimonial'
import { Contact } from '@/components/site/contact'

export default function Home() {
  return (
    // --intro: how long the loader takes, so the first screen waits for it
    <div style={{ ['--intro' as string]: '2.1s' }}>
      <DoorHero />
      <Ribbons />
      <Services />
      <Work />
      <Process />
      <About />
      <Testimonial />
      <Contact />
    </div>
  )
}
