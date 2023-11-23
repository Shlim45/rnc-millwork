import styles from '@/styles/ImageLeft.module.css'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'


export const ImageRight = ({ heading, text, imageURL, imageAlt, link }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.heading}>{heading}</h2>
                <p className={styles.text}>{text}
                    {link &&
                        <Link href={link}>&#10532;</Link>
                    }
                </p>

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
                <p className={styles.text}>{text}
                    {link &&
                        <Link href={link}>&#10532;</Link>
                    }
                </p>

            </div>
        </div>
    )
}

export default ImageLeft