import Head from 'next/head'
import HeaderImage from '@/components/HeaderImage'
import sawStopPic from '../../public/home/lumber_on_sawstop_blurred.webp'
import styles from '@/styles/Home.module.css'
import EmblaCarousel from '@/components/EmblaCarousel'

const OPTIONS = { inViewThreshold: 0, dragFree: true, loop: true };
const SLIDE_COUNT = 7;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  return (
    <>
      <Head>
        <title>RC Millwork of Pittsburgh</title>
        <meta name="description" content="Custom woodworking millwork shop located near Pittsburgh, PA" />
        <meta name="keywords" content="rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rcm-icon.png" />
      </Head>
      
      <HeaderImage 
        src={sawStopPic} 
        alt="Lumber resting atop a SawStop."
      />

      <br />

      <section style={{width: "60vw", fontSize: "1rem"}}>
        <p>RCMillwork proudly serves the Greater Pittsburgh region, delivering beautful hand-crafted wooden furniture, cabinetry, desks and more to our customers for a competitive price.  Lumber is locally sourced and hand-selected, and all of our products are proudly 100% Made in America.</p>
      </section>

      <main className={styles.sandbox}>
        <h1 className={styles.sandbox__header}><span>Services</span></h1>
        <section className={styles.sandbox__carousel}>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
      </main>
      </>
  )
}
