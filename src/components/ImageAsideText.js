import styles from '@/styles/ImageAsideText.module.css'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

const ImagesIcon = ({ text }) => (
    <div className={styles.icon}>
        {text && text}
        &ensp;
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10" />
        </svg>
    </div>
);

const ImageRight = ({ heading, text, imageURL, imageAlt, link }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.heading}>{heading}</h2>
                <p className={styles.text}>{text}</p>
                {link &&
                    <Link href={link}><ImagesIcon text="Gallery" /></Link>
                }
            </div>

            <CldImage
                className={styles.image}
                src={imageURL}
                key={imageURL}
                alt={imageAlt}
                width={540}
                height={460}
            />
        </div>
    )
}

const ImageLeft = ({ heading, text, imageURL, imageAlt, link }) => {
    return (
        <div className={styles.container}>
            <CldImage
                className={styles.image}
                src={imageURL}
                key={imageURL}
                alt={imageAlt}
                width={540}
                height={460}
            />
            <div className={styles.content}>
                <h2 className={styles.heading}>{heading}</h2>
                <p className={styles.text}>{text}</p>

                {link &&
                    <Link href={link}><ImagesIcon text="Gallery" /></Link>
                }

            </div>
        </div>
    )
}

const ImageAsideText = ({ heading, text, imageURL, imageAlt, link, imageLeft = true }) => {
    if (imageLeft) return <ImageLeft heading={heading} text={text} imageURL={imageURL} imageAlt={imageAlt} link={link} />
    return <ImageRight heading={heading} text={text} imageURL={imageURL} imageAlt={imageAlt} link={link} />
}

export default ImageAsideText;