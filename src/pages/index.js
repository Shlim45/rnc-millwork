import styles from '@/styles/Home.module.css'
import SandBox from '@/components/SandBox';
import EmblaCarousel from '@/components/EmblaCarousel'
import Slideshow from '@/components/Slideshow';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
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

    const shop_slides = [
        "home/RCM_shop",
        "home/shop_left_LS",
        "home/shop_right_1",
        "home/shop_left_PT",
    ];

    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh"
                description="RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services.  Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price."
                canonical="https://www.rccustommillworks.com/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc custom millworks, rc custom millwork, millworks, rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills, RC Custom Millworks of Pittsburgh, RC Custom Millwork, wood shop, furniture, quality, pennsylvania'
                    }
                ]}

            />

            <section className={styles.hero} role='banner'>
                <Slideshow images={shop_slides} delay={5000} />
            </section>

            <SandBox heading="About Us" linkUrl="/about">
                <p>RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road. Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services.</p>
                <p>We specialize in hand-crafting custom products, including:</p>
                <ul className={styles.list}>
                    <li>Custom kitchen cabinets</li>
                    <li>Tables</li>
                    <li>Banisters</li>
                    <li>Mantelpieces</li>
                    <li>Desks</li>
                    <li>Countertops</li>
                    <li>Entertainment centers</li>
                    <li>Bars</li>
                </ul>
                <p>and much more!  Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price.</p>
                <p>We work closely with our clients to ensure that their vision is brought to life and that they are completely satisfied with the final product.</p>
                <p><Link href="/contact">Contact us</Link> today to learn more about how we can help you create the perfect piece for your home or business!</p>
            </SandBox>

            <SandBox heading="Services" linkUrl="/projects">
                <EmblaCarousel slides={_slides} options={OPTIONS} title={true} />
            </SandBox>

        </>
    )
}
