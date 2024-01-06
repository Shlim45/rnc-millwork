import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import SandBox from '@/components/SandBox';
import EmblaCarousel from '@/components/EmblaCarousel'
import Hero from '@/components/Hero';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { supabase } from '@/utils/supabaseClient';
import bg from '../../public/RCM_shop.jpg';

const OPTIONS = { inViewThreshold: 0, dragFree: true, loop: true };

export const getStaticProps = async () => {
    let { data: projectData } = await supabase.from('projects').select('id, title, images, alts, cover').eq('showcase', true).eq('hidden', false);
    let { data: categoryData } = await supabase.from('categories').select().order('id');

    return {
        props: {
            projects: projectData,
            categories: categoryData,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }

}

export default function Home({ projects, categories }) {

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
                description="RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services."
                canonical="https://www.rccustommillworks.com/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc custom millworks, rc custom millwork, millworks, rc millwork, rcm, millwork, mill work, kitchen remodel, kitchen renovation, woodworking, custom wood, furniture, kitchen cabinets, custom cabinets, custom kitchen cabinets, table, desk, cabinet, entertainment center, built in, built-in, vanity, vanities, banister, mantelpiece, countertop, counter-top, bar, wet bar, kitchenette, hand-made, hand made, pittsburgh, south hills, north hills, allegheny county, RC Custom Millworks of Pittsburgh, wood shop, quality, pennsylvania'
                    }
                ]}

            />
            <Header />


            <Hero images={[bg.src]}>
                <SandBox heading="About Us" linkUrl="/about">
                    <p>RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road. Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services.</p>
                    <p>We specialize in hand-crafting custom products, including:</p>
                    <ul className={styles.list}>

                        {
                            categories?.map(cat => <li key={cat.id}><Link href={`/projects#${cat.name.replace(' ', '_')}`}>{cat.name}</Link></li>)
                        }

                    </ul>
                    <p>and much more!  Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price.</p>
                    <p>We work closely with our clients to ensure that their vision is brought to life and that they are completely satisfied with the final product.</p>
                    <p><Link href="/contact">Contact us</Link> today to learn more about how we can help you create the perfect piece for your home or business!</p>
                </SandBox>
            </Hero>

            <SandBox heading="Projects" linkUrl="/projects">
                <EmblaCarousel slides={_slides} options={OPTIONS} title={true} />
            </SandBox>

        </>
    )
}
