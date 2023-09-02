import Link from 'next/link'
import styles from '@/styles/SandBox.module.css'

const SandBox = ({ heading, linkUrl = undefined, children }) => {
    return (
        <section className={styles.sandbox}>
            <h1 className={styles.sandbox__header}><span>{linkUrl ? (<Link href={linkUrl}>{heading}</Link>) : heading}</span></h1>
            <div className={styles.sandbox__content}>
                {children}
            </div>
        </section>
    );
}

export default SandBox;