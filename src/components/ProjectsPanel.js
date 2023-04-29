import styles from '@/styles/Admin.module.css'
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import ProjectEdit from './ProjectEdit';

const ProjectInfo = ({ project, handleSelect }) => {
    const { id, title, images, alts, cover } = project;
    return (
        <div className={styles.projectItem}>
            <button className={styles.edit} onClick={handleSelect}>&#9998;</button>
            {console.log(`ID: '${id}' COVER: '${cover}'`)}
            {images && <CldImage
                src={`projects/${id}/${images[cover]}`}
                width="50"
                height="50"
                key={id}
                alt={alts[cover]}
                className={styles.cover}
            />}
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