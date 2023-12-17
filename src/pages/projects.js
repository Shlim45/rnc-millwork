import React, { useState } from 'react'
import { supabase } from '@/utils/supabaseClient';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import ImageAsideText from '@/components/ImageAsideText';
import { joinClassNames } from '@/utils'
import styles from '@/styles/projects/ProjectList.module.css'


const ProjectNav = ({ categories, selected, handleSelect }) => {
    return (
        <nav className={styles.projectNav}>
            <h3>Categories</h3>
            {categories?.map((category, index) => (
                <Link
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={index === selected ? (joinClassNames(styles.navLink, styles.navLink__selected)) : styles.navLink}
                    href={`#${category.name}`}
                >
                    {category.name}
                </Link>
            ))}
        </nav>
    );
}

const ProjectCategory = ({ name, projects, isMobile = false }) => {
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
                        imageLeft={isMobile || (index % 2 === 0)}
                    />
                ))}
            </div>
        </>


    )

}

const ProjectList = ({ projects, categories, selected = 0, handleSelect, isMobile }) => {
    return (
        <section className={styles.listContainer}>
            <ProjectNav categories={categories} selected={selected} handleSelect={handleSelect} />
            <div className={styles.rightCol}>
                {categories?.map((category, index) => {
                    let matchingProjects = projects?.filter(pro => pro.categories?.includes(category.name));
                    if (matchingProjects?.length > 0) {
                        return (
                            <ProjectCategory name={category.name} projects={matchingProjects} key={index} isMobile={isMobile} />
                        );
                    }
                })}
            </div>
        </section>
    )
}


export default function Projects({ projects, categories }) {
    const [selected, setSelected] = useState(0);

    const handleSelect = index => setSelected(index);

    const isMobile = (typeof window !== "undefined") ? window.innerWidth <= 700 : false;

    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh - Projects"
                description="RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services."
                canonical="https://www.rccustommillworks.com/projects/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc custom millworks, rc custom millwork, millworks, rc millwork, rcm, millwork, mill work, kitchen remodel, kitchen renovation, woodworking, custom wood, furniture, kitchen cabinets, custom cabinets, custom kitchen cabinets, table, desk, cabinet, entertainment center, built in, built-in, vanity, vanities, banister, mantelpiece, countertop, counter-top, bar, wet bar, kitchenette, hand-made, hand made, pittsburgh, south hills, north hills, allegheny county, RC Custom Millworks of Pittsburgh, wood shop, quality, pennsylvania'
                    }
                ]}

            />
            <ProjectList projects={projects} categories={categories} handleSelect={handleSelect} selected={selected} isMobile={isMobile} />
        </>
    )
}

export const getStaticProps = async () => {
    let { data: projectData } = await supabase.from('projects').select('*').eq('hidden', false);
    let { data: categoryData } = await supabase.from('categories').select().order('id');
    let { data: projectCategoryData } = await supabase.from('project_categories').select();

    const projects = projectData.map(project => {
        const cats = projectCategoryData.filter(cat => cat.project_id == project.id);
        return {
            ...project,
            "categories": cats.map(pCat => pCat.category_name)
        }
    }).sort((a, b) => a.id - b.id);;

    return {
        props: {
            projects,
            categories: categoryData
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}