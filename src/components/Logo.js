import Image from "next/image";
import styles from '@/styles/Logo.module.css'
import logo from '@/../public/rcm_logo_horizontal.svg'

const Logo = ({ width = 400, height = 200, background = true }) => {
    return (
        <div className={styles.logo} style={{ width: width + 'px', height: height + 'px' }}>
            {background && (
                <>
                    <div className={styles.bg_left}></div>
                    <div className={styles.bg_right}></div>
                </>
            )}
            <Image src={logo} alt="RC Custom Millwork logo" width={width} height={height} priority />
        </div>
    )
};

export default Logo;