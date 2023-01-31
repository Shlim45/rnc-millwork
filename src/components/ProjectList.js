import Head from 'next/head'
import ProjectItem from './ProjectItem'
import projectStyles from '@/styles/Project.module.css'

const ProjectList = ({ projects }) => {
  return (
    <div className={projectStyles.grid}>
      {projects.map(project => (
        <ProjectItem project={project} key={project.id} />
      ))}
    </div>
  )
}

export default ProjectList