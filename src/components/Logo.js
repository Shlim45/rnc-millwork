import Image from "next/image";
import styles from '@/styles/Logo.module.css'
import logo from '@/../public/rcm_logo_horizontal.svg'

const Logo = () => {
    return (
        <div className={styles.logo}>
            <div className={styles.bg_left}></div>
            <div className={styles.bg_right}></div>
            <Image src={logo} alt="RC Custom Millwork logo" />
        </div>
    )
};

export default Logo;