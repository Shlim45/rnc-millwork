import Link from "next/link"
import Image from "next/image"
import { projects } from "@/data"

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