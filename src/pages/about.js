import styles from '@/styles/Home.module.css'
import { NextSeo } from 'next-seo'

const about = () => {
    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh - About Us"
                description="RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services.  Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price."
                canonical="https://www.rccustommillworks.com/about/"

            />

            <section className={styles.sandbox}>
                <h1 className={styles.sandbox__header}><span>About Us</span></h1>
                <div className={styles.sandbox__content}>
                    <p>RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road. Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services.</p>
                    <p>We specialize in hand-crafting custom products, including:</p>
                    <ul className={styles.list}>
                        <li>Custom cabinets</li>
                        <li>Tables</li>
                        <li>Banisters</li>
                        <li>Mantelpieces</li>
                        <li>Desks</li>
                        <li>Countertops</li>
                        <li>Entertainment centers</li>
                        <li>Bars</li>
                    </ul>
                    <p>and much more!  Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price.</p>
                    <p>We work closely with our clients to ensure that their vision is brought to life and that they are completely satisfied with the final product.</p>
                    <p>Contact us today to learn more about how we can help you create the perfect piece for your home or business!</p>
                </div>
            </section>
        </>

    )
}

export default about