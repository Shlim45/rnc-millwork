import { useState, useEffect } from 'react'
import styles from '@/styles/Hero.module.css'

const Hero = ({ images, delay = 5000, children }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((index + 1) % images.length);
        }, delay);

        return () => clearInterval(intervalId);
    }, [index, images, delay]);

    return (
        <section className={styles.hero} role='banner'>
            {images?.map((imageURL, imageIndex) => (
                <div
                    className={styles.slide}
                    key={imageIndex}
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(var(--background-start-rgb), 0.75), rgba(var(--background-end-rgb), 0.75)), url('${imageURL}')`,
                        opacity: index === imageIndex ? 1 : 0
                    }}
                >
                    {children}
                </div>
            ))}
        </section>
    )
}
export default Hero