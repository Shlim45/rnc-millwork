import ProjectItem from './ProjectItem'
import projectStyles from '@/styles/ProjectItem.module.css'
import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const ProjectList = ({ projects }) => {
    const supabase = useSupabaseClient();

    const [pros, setPros] = useState(null);

    const fetchCategories = async () => {
        try {
            let { data, error, status } = await supabase.from('project_categories').select();

            if (error && status != 406) {
                throw error;
            }

            setPros(projects.map(project => {
                const projectCategories = data.filter(cat => cat.project_id == project.id);
                return {
                    ...project,
                    "categories": projectCategories.map(pCat => pCat.category_name)
                }
            }));
        }
        catch (error) {
            console.error(`Error fetching categories!\n${error.message}`);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className={projectStyles.grid}>
            {pros?.map(project => (
                <ProjectItem project={project} key={project.id} />
            ))}
        </div>
    )
}

export default ProjectList