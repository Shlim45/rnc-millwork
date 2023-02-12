import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import EmblaCarousel from '@/components/EmblaCarousel'
import { CldImage } from 'next-cloudinary';

const images = [
    'projects/3/table_1_fdhleo',
    'projects/4/banister_m798gq',
    'projects/5/ent_center_v1_2_hebcdr',
    'projects/7/kitchen_5_xomklm',
    'projects/8/mantel_4_rgsjax',
    'projects/10/wine_cab_5_xfydmx',
    'projects/12/countertop_1_yi945f',
]

const slides = images.map((url, idx) => ({
    id: idx,
    url,
    alt: "Home carousel image."
}));

const OPTIONS = { inViewThreshold: 0, dragFree: true, loop: true };

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

            <CldImage
                width="800"
                height="600"
                sizes="(max-width: 640px) 620px, (max-width: 1007px) 765px, 800px"
                className={styles.headerImage}
                src="home/lumber_on_sawstop_blurred_x7qpfy"
                alt="Lumber resting atop a SawStop."
                priority
            />

            <section className={styles.intro}>
                <h1 className={styles.sandbox__header}><span><Link href="/about">About Us</Link></span></h1>
                <p>RCMillwork proudly serves the Greater Pittsburgh region, delivering beautiful hand-crafted wooden furniture, cabinetry, desks, countertops and more to our customers for a competitive price.  Lumber is locally sourced and hand-selected, and all of our products are proudly 100% Made in America.</p>
            </section>

            <section className={styles.sandbox}>
                <h1 className={styles.sandbox__header}><span><Link href="/projects">Services</Link></span></h1>
                <div className={styles.sandbox__carousel}>
                    <EmblaCarousel slides={slides} options={OPTIONS} />
                </div>
            </section>
        </>
    )
}
