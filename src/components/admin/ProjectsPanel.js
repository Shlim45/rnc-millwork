import styles from '@/styles/admin/Admin.module.css'
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import ProjectEdit from '@/components/admin/ProjectEdit';

export const ProjectInfo = ({ project, handleSelect }) => {
    const { id, title, images, alts, cover, categories } = project;
    return (
        <div className={styles.projectItem}>
            <button className={styles.edit} onClick={handleSelect}>&#9998;</button>
            {images && <CldImage
                src={`projects/${id}/${images[cover]}`}
                width="50"
                height="50"
                key={id}
                alt={alts[cover]}
                className={styles.cover}
            />}
            {title}&emsp;
            [{categories.join(', ')}]
        </div>
    );
}

export const PanelItem = ({ project, categories }) => {
    const [selected, setSelected] = useState(false);

    const handleSelect = () => setSelected(!selected);

    return (
        selected
            ? <ProjectEdit project={project} handleSelect={handleSelect} categories={categories} />
            : <ProjectInfo project={project} handleSelect={handleSelect} />
    );
}

const ProjectsPanel = ({ projects, categories }) => {
    return (
        <section className={styles.projectList}>
            {projects?.map(project => <PanelItem project={project} key={project.id} categories={categories} />)}
        </section>
    )
}

export default ProjectsPanel;