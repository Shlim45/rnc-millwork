import ImageAsideText from './ImageAsideText'
import styles from '@/styles/ProjectList.module.css'
import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { joinClassNames } from '@/utils'
import Link from 'next/link'

export const ProjectNav = ({ categories }) => {
    const [selected, setSelected] = useState(0);

    return (
        <nav className={styles.projectNav}>
            <h3>Categories</h3>
            {categories?.map((category, index) => (
                <Link
                    key={index}
                    onClick={() => setSelected(index)}
                    className={index === selected ? (joinClassNames(styles.navLink, styles.navLink__selected)) : styles.navLink}
                    href={`#${category.name}`}
                >
                    {category.name}
                </Link>
            ))}
        </nav>
    );
}

export const ProjectCategory = ({ name, projects }) => {
    return (
        <>
            <a id={name} />
            <div className={styles.card} key={name}>
                <h2><span>{name}</span></h2>
                {projects?.map((project, index) => (
                    <ImageAsideText
                        key={project.id}
                        imageURL={`projects/${project.id}/${project.images[project.cover]}`}
                        imageAlt={project.alts[project.cover]}
                        heading={project.title}
                        text={project.body}
                        link={`/project/${project.id}`}
                        imageLeft={(window?.innerWidth <= 700) || (index % 2 === 0)} />
                ))}
            </div>
        </>


    )

}

const ProjectList = ({ projects }) => {
    const supabase = useSupabaseClient();

    const [pros, setPros] = useState(null);
    const [categories, setCategories] = useState(null);

    const fetchProjectCategories = async () => {
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
            })
                .sort((a, b) => a.id - b.id));
        }
        catch (error) {
            console.error(`Error fetching categories!\n${error.message}`);
        }
    }

    const fetchCategoryData = async () => {
        try {
            let { data, error, status } = await supabase.from('categories').select().order('id');

            if (error && status != 406) {
                throw error;
            }

            setCategories(data);

        }
        catch (error) {
            console.error(`Error fetching category data!\n${error.message}`);
        }
    }

    useEffect(() => {
        if (!pros) fetchProjectCategories();
        if (!categories) fetchCategoryData();
    });

    return (
        <section className={styles.listContainer}>
            <ProjectNav categories={categories} />
            <div className={styles.rightCol}>
                {categories?.map((category, index) => {
                    let matchingProjects = pros?.filter(pro => pro.categories?.includes(category.name));
                    if (matchingProjects?.length > 0) {
                        return (
                            <ProjectCategory name={category.name} projects={matchingProjects} key={index} />
                        );
                    }
                })}
            </div>
        </section>
    )
}

export default ProjectList