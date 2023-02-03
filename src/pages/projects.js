import Head from 'next/head'
import ProjectList from '@/components/ProjectList';
import styles from '@/styles/Projects.module.css'
import { supabase } from '@/utils/supabaseClient';

export default function Projects({ projects }) {
    return (
        <>
            <Head>
                <title>RC Millwork of Pittsburgh</title>
                <meta name="description" content="Custom woodworking millwork shop located near Pittsburgh, PA" />
                <meta name="keywords" content="rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/rcm-icon.png" />
            </Head>

            <section className={styles.container}>
                <h1 className={styles.title}><span>Projects</span></h1>
                <ProjectList projects={projects} />
            </section>
        </>
    )
}


// export const getServerSideProps = async () => {
export const getStaticProps = async () => {
    let { data } = await supabase.from('projects').select('*');

    return {
        props: {
            projects: data
        }
    }
}