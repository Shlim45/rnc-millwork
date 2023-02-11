import { CldImage } from 'next-cloudinary';
import styles from '@/styles/Logo.module.css'

const Logo = () => {
    return (
        <div className={styles.logo}>
            <div className={styles.bg_left}></div>
            <div className={styles.bg_right}></div>
            <CldImage
                width="400"
                height="200"
                src="_rcm_logo_horizontal_njkbpo"
                alt="RC Custom Millwork logo"
            />
        </div>
    )
};

export default Logo;