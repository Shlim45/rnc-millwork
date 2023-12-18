import Navbar from './Navbar'

import Footer from './Footer'
import styles from '@/styles/Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />

            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                    <Footer />
                </main>
            </div>
        </>
    )
}

export default Layout