import styles from '@/styles/ProjectEdit.module.css'
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import FormWrapper from './FormWrapper';
import SignedUpload from './SignedUpload';
import MessageBox from './MessageBox';
import { supabase } from "@/utils/supabaseClient";


export const CategoryEdit = ({ categories }) => {
    return categories.map(category => {

    });
}

const ProjectEdit = ({ project, handleSelect, categories }) => {
    const [updating, setUpdating] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [message, setMessage] = useState(null);

    const [projectCategories, setProjectCategories] = useState(project.categories);
    const [projectData, setProjectData] = useState({
        id: project.id,
        title: project.title,
        // categories: project.categories,
        images: project.images,
        alts: project.alts,
        cover: project.cover,
        body: project.body,
        showcase: project.showcase,
        hidden: project.hidden,
    });



    async function updateProject() {
        try {
            setUpdating(true);

            //TODO(jon): category updates

            const updates = {
                ...projectData,
                updated_at: new Date().toISOString(),
            };

            let { error } = await supabase.from('projects').upsert(updates);
            if (error) throw error;
            setMessage({
                message: `Project has been updated.`,
                success: true,
            });
        } catch (error) {
            setMessage({
                message: `Error updating the project!  Report to site administrator: ${error.message}`,
                success: false,
            });

        } finally {
            setUpdating(false);
        }
    }

    async function deleteProject() {
        if (!confirm('Are you SURE you want to delete all data for this project FOREVER?  Images will NOT be deleted from Cloudinary.\nConsider HIDING project instead.')) return;
        try {
            setUpdating(true);

            let { error } = await supabase.from('projects').delete().eq('id', projectData.id);
            if (error) throw error;
            setMessage({
                message: `Project has been deleted.`,
                success: true,
            });
        }
        catch (error) {
            setMessage({
                message: `Error deleting the project!  Report to site administrator: ${error.message}`,
                success: false,
            });
        }
        finally {
            setUpdating(false);
        }
        handleSelect();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await updateProject();
    }

    const handleAddImage = ({ url, context }) => {
        const fileName = url?.substring(url?.lastIndexOf('/') + 1);
        const { alt } = context?.custom;

        if (projectData.images?.length > 0) {
            setProjectData(prev => ({
                ...prev,
                images: [...prev.images, fileName],
                alts: [...prev.alts, alt],
            }));
        } else {
            setProjectData(prev => ({
                ...prev,
                images: [fileName],
                alts: [alt],
            }));
        }
    };

    const handleEditImage = event => {
        event.preventDefault();
        if (selected === -1) { return; }

        const altToEdit = projectData.alts[selected];

        const promptMessage =
            `Enter a new image description.\n\nPREVIUS: "${altToEdit}"`;

        const newAlt = prompt(promptMessage, altToEdit);

        if (newAlt && newAlt != altToEdit) {
            setProjectData(prev => ({
                ...prev,
                alts: prev.alts.map((alt, index) => (index === selected ? newAlt : alt)),
            }));
        }
    }

    const handleRemoveImage = (event) => {
        event.preventDefault();
        if (selected === -1) { return; }

        const imageToRemove = images[selected];
        const altToRemove = alts[selected];

        const confirmMessage =
            `Are you sure you want to remove the following image?\nNOTE: This does not delete the image from the server.\n\nFILENAME: '${imageToRemove}'\nDESCRIPT: "${altToRemove}"`;

        if (confirm(confirmMessage)) {
            setProjectData(prev => ({
                ...prev,
                images: prev.images.filter((_, index) => index !== selected),
                alts: prev.alts.filter((_, index) => index !== selected),
                cover: prev.cover === selected
                    ? (prev.images.length > 0
                        ? 0
                        : -1)
                    : (prev.cover > selected
                        ? prev.cover--
                        : prev.cover),
            }));

            setSelected(-1);
        }
    };

    //TODO(jon): handle category changes

    const handleCategorySelect = (event) => {
        console.log(event.target.name)
    }

    const handleProjectTextChange = event => {
        let { name, value } = event.target;
        if (name === 'cover') {
            --value; // convert from 1-based for user, to 0-based for code
        }

        setProjectData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleProjectSelectedChange = event => {
        setProjectData(prev => ({
            ...prev,
            [event.target.name]: event.target.selected,
        }));
    }

    return (
        <div className={styles.project}>
            {projectData.images && <CldImage
                src={`projects/${projectData.id}/${projectData.images[projectData.cover]}`}
                width="100"
                height="100"
                key={projectData.id}
                alt={projectData.alts[projectData.cover]}
                className={styles.cover}
            />}

            <FormWrapper
                endpoint="#"
                method="post"
                handleSubmit={handleSubmit}
            >
                <div className={styles.organizer}>

                    <div className={styles.titleCover}>
                        <label>Title
                            <input type="text" id="title" name="title" value={projectData.title} onChange={handleProjectTextChange} required />
                        </label>
                        <label>Cover Image
                            <input type="number" id="cover" name="cover" min="1" max={projectData.images?.length} value={projectData.cover + 1} onChange={handleProjectTextChange} />
                        </label>
                    </div>

                    <div className={styles.categoryList}>
                        <label>Categories</label>
                        <ul>
                            {categories.map(cat => {
                                return (
                                    <li key={cat.id}>
                                        <input type="checkbox" name={cat.name} key={cat.name} checked={projectCategories.includes(cat.name)} onChange={handleCategorySelect} /> {cat.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className={styles.imageInfo}>
                    <label htmlFor="images">Images</label>
                    <select className={styles.imageInfo__images} name="images" size={6} onChange={e => setSelected(e.target.selectedIndex)}>
                        {projectData.images?.map((image, index) => (<option key={index}>{image}</option>))}
                    </select>

                    <label htmlFor="alts">Descriptions</label>
                    <select className={styles.imageInfo__alts} name="alts" size={6} disabled>
                        {projectData.alts?.map((alt, index) => (<option key={index}>{alt}</option>))}
                    </select>
                </div>

                <SignedUpload id={projectData.id} title={projectData.title} imageCount={projectData.images ? projectData.images.length : 0} handler={handleAddImage} />
                <button className={styles.editButton} type="button" disabled={selected === -1} onClick={handleEditImage}>Edit Image</button>
                <button className={styles.removeButton} type="button" disabled={selected === -1} onClick={handleRemoveImage}>Remove Image</button>

                <label htmlFor="body">Project Description</label>
                <textarea className={styles.body} id="body" name="body" rows="10" value={projectData.body} onChange={handleProjectTextChange} required />

                <label htmlFor="showcase">Showcase Project on Home Page</label>
                <input type="checkbox" name="showcase" id="showcase" checked={projectData.showcase} onChange={handleProjectSelectedChange} />
                <label htmlFor="hidden">Hide Project from Customer View</label>
                <input type="checkbox" name="hidden" id="hidden" checked={projectData.hidden} onChange={handleProjectSelectedChange} />

                <MessageBox message={message} />


                <div className={styles.buttons}>
                    <div className={styles.tooltip}>
                        <button type="submit" className={styles.save} disabled={updating}>&#10004;</button>
                        <div className={styles.right}>
                            <p>Save</p>
                            <i></i>
                        </div>
                    </div>


                    <div className={styles.tooltip}>
                        <button type="reset" className={styles.cancel} onClick={handleSelect} disabled={updating}>&#9587;</button>
                        <div className={styles.right}>
                            <p>Cancel</p>
                            <i></i>
                        </div>
                    </div>

                    <div className={styles.tooltip}>
                        <button type="button" className={styles.delete} onClick={deleteProject} disabled={updating}>&#x1F5D1;</button>
                        <div className={styles.right}>
                            <p>Delete Project</p>
                            <i></i>
                        </div>
                    </div>

                </div>
            </FormWrapper>
        </div>
    );
}

export default ProjectEdit;