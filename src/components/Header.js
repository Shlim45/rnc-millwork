import headerStyles from '@/styles/Header.module.css'

const Header = () => {
    return (
        <div className={headerStyles.container}>
            <h1 className={headerStyles.title}>
                <span>RC</span>Millwork
            </h1>
            <br />
            <p className={headerStyles.description}>Custom interior and exterior millwork for commercial and residential applications.</p>
            <br />
        </div>
    )
}

export default Header