import styles from '@/styles/ProjectEdit.module.css'
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import FormWrapper from './FormWrapper';
import SignedUpload from './SignedUpload';
import { supabase } from "@/utils/supabaseClient";
import { joinClassNames } from '@/utils';

const ProjectEdit = ({ project, handleSelect }) => {
    const { id } = project;

    const [updating, setUpdating] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [images, setImages] = useState(project.images);
    const [alts, setAlts] = useState(project.alts);
    const [cover, setCover] = useState(project.cover);
    const [body, setBody] = useState(project.body);
    const [selected, setSelected] = useState(-1);
    const [message, setMessage] = useState('');

    async function updateProject() {
        try {
            setUpdating(true)

            const updates = {
                // id: user.id,
                id,
                title,
                images,
                alts,
                cover,
                body,
                updated_at: new Date().toISOString(),

            }

            let { error } = await supabase.from('projects').upsert(updates);
            if (error) throw error;
            setMessage('Project updated!');
        } catch (error) {
            setMessage('Error updating the data!');
            console.log(error);
        } finally {
            setUpdating(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await updateProject();
    }

    const handleAddImage = ({ url, context }) => {
        const fileName = url?.substring(url.lastIndexOf('/') + 1);
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

        // const imgToEdit = images[selected];
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
            setImages(currentImages => currentImages.filter((image, index) => index !== selected));
            setAlts(currentAlts => currentAlts.filter((alt, index) => index !== selected));
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
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} required />

                <label htmlFor="cover">Cover Image</label>
                <input type="number" id="cover" name="cover" min="1" max={images?.length} value={cover + 1} onChange={e => setCover(e.target.value - 1)} />

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

                <div className={styles.message}>
                    {message}
                </div>

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
                </div>
            </FormWrapper>
        </div>
    );
}

export default ProjectEdit;