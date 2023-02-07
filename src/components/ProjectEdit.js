import styles from '@/styles/ProjectEdit.module.css'
import Image from 'next/image';
import { useState } from 'react';
import FormWrapper from './FormWrapper';

const ProjectEdit = ({ project, handleSelect }) => {
    const { id } = project;

    const [updating, setUpdating] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [images, setImages] = useState(project.images);
    const [alts, setAlts] = useState(project.alts);
    const [cover, setCover] = useState(project.cover);
    const [body, setBody] = useState(project.body);

    /*
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
            alert('Project updated!')
        } catch (error) {
            alert('Error updating the data!');
            console.log(error);
        } finally {
            setUpdating(false);
        }
    }
    */

    async function handleSubmit(event) {
        event.preventDefault();
        alert('Under Construction!');
        // await updateProject();
    }

    return (
        <div className={styles.project}>
            <Image className={styles.cover} src={`/projects/${id}/${images[cover]}`} alt={alts[cover]} width={100} height={100} />
            <FormWrapper
                endpoint="#"
                method="post"
                handleSubmit={handleSubmit}
            >
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} required />

                <label htmlFor="images">Images</label>
                <input type="text" id="images" name="images" value={images} onChange={e => setImages(e.target.value.split(','))} required />

                <label htmlFor="alts">Image Descriptions</label>
                <input type="text" id="alts" name="alts" value={alts} onChange={e => setAlts(e.target.value.split(','))} required />

                <label htmlFor="cover">Cover Image Index</label>
                <input type="number" min={0} max={images.length - 1} id="cover" name="cover" value={cover} onChange={e => setCover(e.target.value)} required />

                <label htmlFor="body">Project Description</label>
                <textarea className={styles.body} id="body" name="body" rows="10" value={body} onChange={e => setBody(e.target.value)} required />

                <div className={styles.buttons}>
                    <button type="submit" className={styles.save} disabled={updating}>&#10004;</button>
                    <button type="reset" className={styles.cancel} onClick={handleSelect} disabled={updating}>&#9587;</button>
                </div>
            </FormWrapper>
        </div>
    );
}

export default ProjectEdit;