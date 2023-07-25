import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import projectStyles from '@/styles/ProjectItem.module.css';

const ProjectItem = ({ project }) => {
    const { id, images, alts, cover, title, body, categories } = project;

    return (
        <Link className={projectStyles.card} href="/project/[id]" as={`/project/${id}`}>
            <h2>{title} <span className={projectStyles.arrow}>&rarr;</span></h2>
            {images?.length > 0 &&
                <CldImage
                    src={`projects/${id}/${images[cover]}`}
                    width="400"
                    height="400"
                    key={id}
                    alt={alts[cover]}
                    className={projectStyles.card__image}
                    priority={id <= 2}
                />}
            <p>{body}</p>
        </Link>
    )
}

export default ProjectItem