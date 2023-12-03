import styles from '@/styles/Admin.module.css'
import { CldImage } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import ProjectEdit from './ProjectEdit';

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
    const supabase = useSupabaseClient();

    const [pros, setPros] = useState();
    const [fetched, setFetched] = useState(false);

    const fetchProjectCategories = async () => {
        try {
            let { data, error, status } = await supabase.from('project_categories').select();

            if (error && status != 406) {
                throw error;
            }

            setPros(projects?.map(project => {
                const projectCategories = data.filter(cat => cat.project_id == project.id);
                return {
                    ...project,
                    "categories": projectCategories.map(pCat => pCat.category_name)
                }
            })
                .sort((a, b) => a.id - b.id));

            setFetched(true);
        }
        catch (error) {
            console.error(`Error fetching categories!\n${error.message}`);
        }
    }

    useEffect(() => {
        if (!fetched) fetchProjectCategories();
    });


    return (
        <section className={styles.projectList}>
            {pros?.map(project => <PanelItem project={project} key={project.id} categories={categories} />)}
        </section>
    )
}

export default ProjectsPanel;