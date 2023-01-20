import Link from 'next/link'
import Image from 'next/image'
import projectStyles from '@/styles/Project.module.css'

const ProjectItem = ({project}) => {
  return (
    <Link className={projectStyles.card} href="/project/[id]" as={`/project/${project.id}`}>
        <h3>{project.title} &rarr;</h3>
        <Image src={`/projects/${project.images[0]}`} key={project.id} alt={project.alts[0]} className="projectItemImage"  width={192} height={256} />
        <p>{project.body}</p>
    </Link>
  )
}

export default ProjectItem