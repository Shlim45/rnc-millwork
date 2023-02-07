import styles from '@/styles/Admin.module.css'
import Image from 'next/image'
import { useState } from 'react';
import ProjectEdit from './ProjectEdit';

const ProjectInfo = ({ project, handleSelect }) => {
    const { id, title, images, alts, cover } = project;
    return (
        <div className={styles.projectItem}>
            <button className={styles.edit} onClick={handleSelect}>&#9998;</button>
            <Image className={styles.cover} src={`/projects/${id}/${images[cover]}`} alt={alts[cover]} width={50} height={50} />
            {title}
        </div>
    );
}

const PanelItem = ({ project }) => {
    const [selected, setSelected] = useState(false);

    const handleSelect = () => setSelected(!selected);

    return (
        selected
            ? <ProjectEdit project={project} handleSelect={handleSelect} />
            : <ProjectInfo project={project} handleSelect={handleSelect} />
    );
}

const ProjectsPanel = ({ projects }) => {
    return (
        <section className={styles.projectList}>
            {projects.map(project => <PanelItem project={project} key={project.id} />)}
        </section>
    )
}
export default ProjectsPanel