import Link from 'next/link'
import Image from 'next/image'
import projectStyles from '@/styles/Project.module.css'

const ProjectItem = ({project}) => {
  return (
    <Link className={projectStyles.card} href="/project/[id]" as={`/project/${project.id}`}>
        <h3>{project.title} <span className={projectStyles.arrow}>&rarr;</span></h3>
        <Image src={`/projects/${project.id}/${project.images[project.cover]}`} key={project.id} alt={project.alts[0]} className={projectStyles.card__image}  width={400} height={400} priority={project.id <= 2 ? "true" : "false"} />
        <p>{project.body}</p>
    </Link>
  )
}

export default ProjectItem