import styles from '@/styles/About.module.css'

const about = () => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}><span>About Us</span></h1>
            <p>RC Custom Millworks proudly serves the Greater Pittsburgh region, delivering beautful hand-crafted wooden furniture, cabinetry, desks and more to our customers for a competitive price.  Lumber is locally sourced and hand-selected, and all of our products are proudly 100% Made in America.</p>
        </section>
    )
}

export default about