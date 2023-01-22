import Link from "next/link"
import Image from "next/image"
import { projects } from "@/data"

const project = ({project}) => {
    return (
        <div style={{ maxWidth: "80vw" }}>
            <h1>{project.title}</h1>
            <p>{project.body}</p>
            <br />
            <div>
                {project.images.map((image, index) => <Image src={`/projects/${image}`} key={project.id} alt={project.alts[index]} width={480} height={640} style={{ maxWidth: "80vw", height: "auto" }}/>)}
            </div>
            <br />
            <Link href='/projects/'>Back to Projects</Link>
        </div>
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

export default project