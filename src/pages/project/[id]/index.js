import Link from "next/link"
import Image from "next/image"
import { server } from "@/config"

const project = ({project}) => {
    return (
        <>
            <h1>{project.title}</h1>
            <p>{project.body}</p>
            <div className="projectImages">
                {project.images.map((image, index) => <Image src={`/projects/${image}`} key={project.id} alt={project.alts[index]} className="projectImage"  width={480} height={640} />)}
            </div>
            <br />
            <Link href='/projects/'>Go Back</Link>
        </>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/projects/${context.params.id}`)

    const project = await res.json();

    return {
        props: {
            project
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/projects/`)

    const projects = await res.json();

    const ids = projects.map(project => project.id)
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default project