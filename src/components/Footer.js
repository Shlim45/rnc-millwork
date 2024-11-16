import styles from '@/styles/Footer.module.css';

const Footer = () => {
    const foundedYear = 2023;
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.copy}>
            <small>&copy; Copyright {foundedYear}-{currentYear}, RC Custom Millworks, LLC</small>
        </footer>
    )
}

export default Footer;