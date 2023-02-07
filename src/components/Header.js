import headerStyles from '@/styles/Header.module.css'
import Logo from './Logo'

const Header = () => {
    return (
        <div className={headerStyles.container}>
            <Logo />
            <p className={headerStyles.description}>Custom interior and exterior millwork for commercial and residential applications.</p>
        </div>
    )
}

export default Header