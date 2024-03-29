import { useState, useEffect } from 'react'
import styles from '@/styles/Slideshow.module.css'
import { CldImage } from 'next-cloudinary'

const Slideshow = ({ images, delay = 3000 }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((index + 1) % images.length);
        }, delay);

        return () => clearInterval(intervalId);
    }, [index, images, delay]);

    return (
        <div className={styles.slideshow}>
            {images?.map((imageURL, imageIndex) => (
                <div className={styles.slide} key={imageIndex}>
                    <CldImage
                        className={styles.image}
                        src={imageURL}
                        key={imageURL}
                        alt={`Shop photo ${imageIndex + 1}`}
                        style={{ opacity: index === imageIndex ? 1 : 0 }}
                        priority
                        fill
                    />
                </div>
            ))}
        </div>
    )
}
export default Slideshow