import styles from '@/styles/Header.module.css'
import Logo from './Logo'

const Header = () => {
    return (
        <div className={styles.container}>
            <Logo />
            <p className={styles.description}>Custom interior and exterior millwork for commercial and residential applications.</p>
        </div>
    )
}

export default Header