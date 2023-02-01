import Image from 'next/image'
import headerStyles from '@/styles/Header.module.css'
import logo from '@/../public/rcm_logo_horizontal.svg'

const Header = () => {
    return (
        <div className={headerStyles.container}>
            <div className={headerStyles.logo}>
                <Image className={headerStyles.logo} src={logo} alt="RC Custom Millwork logo" />
            </div>
            <p className={headerStyles.description}>Custom interior and exterior millwork for commercial and residential applications.</p>
        </div>
    )
}

export default Header