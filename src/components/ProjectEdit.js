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
    const { id, categories: projectCategories } = project;

    const [updating, setUpdating] = useState(false);
    //TODO(jon): Refactor state into one object for a project
    const [title, setTitle] = useState(project.title);
    const [images, setImages] = useState(project.images);
    const [alts, setAlts] = useState(project.alts);
    const [cover, setCover] = useState(project.cover);
    const [body, setBody] = useState(project.body);
    const [showcase, setShowcase] = useState(project.showcase);
    const [hidden, setHidden] = useState(project.hidden);
    const [selected, setSelected] = useState(-1);
    const [message, setMessage] = useState(null);

    async function updateProject() {
        try {
            setUpdating(true);

            const updates = {
                // id: user.id, // TODO(jon): Add UPDATED_BY field for user.id
                id,
                title,
                images,
                alts,
                cover,
                body,
                updated_at: new Date().toISOString(),
                showcase,
                hidden,
            }

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
        // handleSelect();
    }

    async function deleteProject() {
        if (!confirm('Are you SURE you want to delete all data for this project FOREVER?  Images will NOT be deleted from Cloudinary.\nConsider HIDING project instead.')) return;
        try {
            setUpdating(true);

            let { error } = await supabase.from('projects').delete().eq('id', id);
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

        if (images?.length > 0) {
            setImages(currentImages => [...currentImages, fileName]);
            setAlts(currentAlts => [...currentAlts, alt]);
        } else {
            setImages([fileName]);
            setAlts([alt]);
        }
    };

    const handleEditImage = event => {
        event.preventDefault();
        if (selected === -1) { return; }

        const altToEdit = alts[selected];

        const promptMessage =
            `Enter a new image description.\n\nPREVIUS: "${altToEdit}"`;

        const newAlt = prompt(promptMessage, altToEdit);

        if (newAlt && newAlt != altToEdit) {
            setAlts(currentAlts => currentAlts.map((alt, index) => {
                if (index === selected) {
                    return newAlt;
                }
                return alt;
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
            setImages(currentImages => currentImages.filter((_, index) => index !== selected));
            setAlts(currentAlts => currentAlts.filter((_, index) => index !== selected));
            if (cover === selected) {
                if (images.length > 0) {
                    setCover(0);
                } else {
                    setCover(-1);
                }
            }
            else if (cover > selected) {
                setCover(currentCover => --currentCover);
            }

            setSelected(-1);
        }
    };

    //TODO(jon): handle category changes

    const handleCategorySelect = (event) => {
        console.log(event.target.name)
    }

    return (
        <div className={styles.project}>
            {images && <CldImage
                src={`projects/${id}/${images[cover]}`}
                width="100"
                height="100"
                key={id}
                alt={alts[cover]}
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
                            <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
                        </label>
                        <label>Cover Image
                            <input type="number" id="cover" name="cover" min="1" max={images?.length} value={cover + 1} onChange={e => setCover(e.target.value - 1)} />
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
                        {images?.map((image, index) => (<option key={index}>{image}</option>))}
                    </select>

                    <label htmlFor="alts">Descriptions</label>
                    <select className={styles.imageInfo__alts} name="alts" size={6} disabled>
                        {alts?.map((alt, index) => (<option key={index}>{alt}</option>))}
                    </select>
                </div>

                <SignedUpload id={id} title={title} imageCount={images ? images.length : 0} handler={handleAddImage} />
                <button className={styles.editButton} type="button" disabled={selected === -1} onClick={handleEditImage}>Edit Image</button>
                <button className={styles.removeButton} type="button" disabled={selected === -1} onClick={handleRemoveImage}>Remove Image</button>

                <label htmlFor="body">Project Description</label>
                <textarea className={styles.body} id="body" name="body" rows="10" value={body} onChange={e => setBody(e.target.value)} required />

                <label htmlFor="showcase">Showcase Project on Home Page</label>
                <input type="checkbox" name="showcase" id="showcase" checked={showcase} onChange={e => setShowcase(e.target.checked)} />
                <label htmlFor="hidden">Hide Project from Customer View</label>
                <input type="checkbox" name="hidden" id="hidden" checked={hidden} onChange={e => setHidden(e.target.checked)} />

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