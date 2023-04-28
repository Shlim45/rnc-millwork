// import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import EmblaCarousel from '@/components/EmblaCarousel'
import { CldImage } from 'next-cloudinary';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';
import { supabase } from '@/utils/supabaseClient';


// const images = [
//     'projects/3/table_1',
//     'projects/4/banister',
//     'projects/5/ent_center_v1_2',
//     'projects/7/kitchen_5',
//     'projects/8/mantel_4',
//     'projects/10/wine_cab_5',
//     'projects/12/countertop_1',
// ]

// const slides = images.map((url, idx) => ({
//     id: idx,
//     url,
//     alt: "Home carousel image."
// }));

const OPTIONS = { inViewThreshold: 0, dragFree: true, loop: true };

export const getStaticProps = async () => {
    let { data } = await supabase.from('projects').select('id, title, images, alts, cover').eq('showcase', true);

    return {
        props: {
            projects: data
        }
    }

}

export default function Home({ projects }) {

    const _slides = projects.map(({ id, title, images, alts, cover }) => ({
        id,
        title,
        url: `projects/${id}/${images[cover]}`,
        alt: alts[cover],
        link: `project/${id}`,
    }));

    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh"
                description="Custom woodworking millwork shop located near Pittsburgh, PA that creates beautiful hand-crafted custom wooden furniture, cabinetry, desks and more."
                canonical="https://www.rccustommillworks.com/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills, RC Custom Millworks of Pittsburgh, RC Custom Millwork'
                    }
                ]}

            />

            <CldImage
                width="800"
                height="600"
                sizes="(max-width: 640px) 620px, (max-width: 1007px) 765px, 800px"
                className={styles.headerImage}
                src="home/lumber_on_sawstop_blurred"
                alt="Lumber resting atop a SawStop."
                priority
            />

            <section className={styles.intro}>
                <h1 className={styles.sandbox__header}><span><Link href="/about">About Us</Link></span></h1>
                <p>RC Custom Millworks proudly serves the Greater Pittsburgh region, delivering beautiful hand-crafted wooden furniture, cabinetry, desks, countertops and more to our customers for a competitive price.  Lumber is locally sourced and hand-selected, and all of our products are proudly 100% Made in America.</p>
            </section>

            <section className={styles.sandbox}>
                <h1 className={styles.sandbox__header}><span><Link href="/projects">Services</Link></span></h1>
                <div className={styles.sandbox__carousel}>
                    <EmblaCarousel slides={_slides} options={OPTIONS} />
                </div>
            </section>
        </>
    )
}
