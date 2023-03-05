import Image from "next/image";
import styles from '@/styles/Logo.module.css'
import logo from '@/../public/rcm_logo_horizontal.svg'

const Logo = ({ width = 400, height = 200, isNav = false }) => {
    return (

        <Image className={isNav ? styles.navLogo : styles.logo} src={logo} alt="RC Custom Millwork logo" width={width} height={height} priority />
    )
};

export default Logo;