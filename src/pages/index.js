import Head from 'next/head'
import Image from 'next/image'
import sawStopPic from '../../public/home/lumber_on_sawstop_blurred.webp'

export default function Home() {
  return (
    <>
      <Head>
        <title>RnC Custom Millwork</title>
        <meta name="description" content="Custom woodworking millwork shop" />
        <meta name="keywords" content="woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Image 
        src={sawStopPic} 
        alt={"Lumber resting atop a SawStop."} 
        priority
      />

      <h1>Home page</h1>
    </>
  )
}
