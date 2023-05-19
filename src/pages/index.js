import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import EmblaCarousel from '@/components/EmblaCarousel'
import { CldImage } from 'next-cloudinary';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';
import { supabase } from '@/utils/supabaseClient';


const OPTIONS = { inViewThreshold: 0, dragFree: true, loop: true };

export const getStaticProps = async () => {
    let { data } = await supabase.from('projects').select('id, title, images, alts, cover').eq('showcase', true).eq('hidden', false);

    return {
        props: {
            projects: data
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
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
                <p>RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road. Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services. We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more. Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price. We work closely with our clients to ensure that their vision is brought to life and that they are completely satisfied with the final product. Contact us today to learn more about how we can help you create the perfect piece for your home or business.</p>
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
