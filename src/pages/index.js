import Head from 'next/head'
import HeaderImage from '@/components/HeaderImage'
import sawStopPic from '../../public/home/lumber_on_sawstop_blurred.webp'

export default function Home() {
  return (
    <>
      <Head>
        <title>RnC Custom Millwork</title>
        <meta name="description" content="Custom woodworking millwork shop located near Pittsburgh, PA" />
        <meta name="keywords" content="woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <HeaderImage 
        src={sawStopPic} 
        alt="Lumber resting atop a SawStop."
      />

      <br />

      <section style={{width: "80vw", fontSize: "1rem"}}>
        <p>RCMillwork proudly serves the Greater Pittsburgh region, delivering beautful hand-crafted wooden furniture, cabinetry, desks and more to our customers for a competitive price.  Lumber is locally sourced and hand-selected, and all of our products are proudly 100% Made in America.</p>
      </section>
    </>
  )
}
