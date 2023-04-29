import Link from "next/link"
import Head from "next/head"
import EmblaCarousel from '@/components/EmblaCarousel'
import { useEffect, useState } from "react"
import { isInDevMode } from "@/config"
import { supabase } from "@/utils/supabaseClient"
import styles from "@/styles/Project.module.css"

const Project = ({ project }) => {
    const [imgs, setImgs] = useState();

    useEffect(() => {
        setImgs(project.images.map((image, idx) => ({
            id: idx,
            url: `projects/${project.id}/${image}`,
            alt: project.alts[idx]
        })));
    }, [project]);

    const OPTIONS = { inViewThreshold: 0, dragFree: true, loop: true };

    return (
        <>
            <Head>
                <title>RC Millwork of Pittsburgh</title>
                <meta name="description" content="Projects done by RC Millwork, a custom woodworking millwork shop located near Pittsburgh, PA" />
                <meta name="keywords" content="rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/rcm-icon.png" />
            </Head>

            <section className={styles.sandbox}>
                <h2><span>{project.title}</span></h2>
                <p>{project.body}</p>
                <div className={styles.sandbox__carousel}>
                    <EmblaCarousel slides={imgs} options={OPTIONS} />
                </div>

                <Link href='/projects/'>Back to Projects</Link>
                <br />
                <Link href='/'>Home</Link>
            </section>
        </>
    )
}

export const getStaticProps = async (context) => {
    let { data } = await supabase.from('projects').select('*').eq('id', context.params.id).single();

    return {
        props: {
            project: data
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }

}

export const getStaticPaths = async () => {
    // When this is true (in preview environments) don't
    // prerender any static pages
    // (faster builds, but slower initial page load)
    if (process.env.SKIP_BUILD_STATIC_GENERATION || isInDevMode()) {
        return {
            paths: [],
            fallback: 'blocking',
        }
    }

    let { data } = await supabase.from('projects').select('id');

    const paths = data.map(obj => ({ params: { id: obj.id.toString() } }))

    return {
        paths,
        fallback: false
    }

}

export default Project