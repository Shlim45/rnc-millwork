import Link from "next/link"
import Head from "next/head"
import Carousel from "@/components/Carousel"
import { projects } from "@/data"
import { useEffect, useState } from "react"

const Project = ({project}) => {
    const [imgs, setImgs] = useState();

    useEffect(() => {
        setImgs(project.images.map((image, idx) => ({
            id: idx,
            url: `/projects/${project.id}/${image}`,
            alt: project.alts[idx]
        })));
    }, [project]);

    return (
        <>
            <Head>
                <title>RC Millwork of Pittsburgh</title>
                <meta name="description" content="Projects done by RC Millwork, a custom woodworking millwork shop located near Pittsburgh, PA" />
                <meta name="keywords" content="rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/rcm-icon.png" />
            </Head>

            <div style={{ maxWidth: "80vw", textAlign: "center"}}>
                <h1>{project.title}</h1>
                <p>{project.body}</p>
                <Carousel images={imgs} />
                <Link href='/projects/'>Back to Projects</Link>
            </div>
        </>
    )
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const filtered = projects.filter(project => project.id === id);
    const project = filtered[0];

    return {
        props: {
            project
        }
    }

}

export const getStaticPaths = async () => {
    const ids = projects.map(project => project.id)
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }

}

export default Project