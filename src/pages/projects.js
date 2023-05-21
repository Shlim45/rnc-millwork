import ProjectList from '@/components/ProjectList';
import styles from '@/styles/Home.module.css'
import { supabase } from '@/utils/supabaseClient';
import { NextSeo } from 'next-seo';

export default function Projects({ projects }) {
    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh - Projects"
                description="RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services.  Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price."
                canonical="https://www.rccustommillworks.com/projects/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc custom millworks, rc custom millwork, millworks, rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills, RC Custom Millworks of Pittsburgh, RC Custom Millwork, wood shop, furniture, quality, pennsylvania'
                    }
                ]}

            />

            <section className={styles.sandbox}>
                <h1 className={styles.sandbox__header}><span>Projects</span></h1>
                <ProjectList projects={projects} />
            </section>
        </>
    )
}

export const getStaticProps = async () => {
    let { data } = await supabase.from('projects').select('*').eq('hidden', false);

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