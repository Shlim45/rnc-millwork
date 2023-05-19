import styles from '@/styles/About.module.css'
import Link from 'next/link'

const contact = () => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}><span>Contact</span></h1>
            <p>Contact us today to learn more about how we can help you create the perfect piece for your home or business!</p>
            <br />
            <p>Email: <Link href="mailto:roetterbill@rccustommillworks.com">RoetterBill@RCCustomMillworks.com</Link></p>
            <p>Phone: (412) 926-2009</p>
            <br /><br />
            <address>
                951 Killarney Dr <br />
                Pittsburgh, PA 15234
            </address>
        </section>
    )
}

export default contact;