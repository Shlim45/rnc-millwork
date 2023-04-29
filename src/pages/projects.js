import ProjectList from '@/components/ProjectList';
import styles from '@/styles/Projects.module.css'
import { supabase } from '@/utils/supabaseClient';
import { NextSeo } from 'next-seo';

export default function Projects({ projects }) {
    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh - Projects"
                description="Custom woodworking millwork shop located near Pittsburgh, PA that creates beautiful hand-crafted custom wooden furniture, cabinetry, desks and more."
                canonical="https://www.rccustommillworks.com/projects/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills, RC Custom Millworks of Pittsburgh, RC Custom Millwork'
                    }
                ]}

            />

            <section className={styles.container}>
                <h1 className={styles.title}><span>Projects</span></h1>
                <ProjectList projects={projects} />
            </section>
        </>
    )
}

export const getStaticProps = async () => {
    let { data } = await supabase.from('projects').select('*');

    return {
        props: {
            projects: data
        }
    }
}