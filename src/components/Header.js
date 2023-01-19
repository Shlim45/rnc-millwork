import headerStyles from '@/styles/Header.module.css'

const Header = () => {
  return (
    <div>
        <h1 className={headerStyles.title}>
            <span>R&C Custom</span> Millwork
        </h1>
        <br />
        <p className={headerStyles.description}>Custom interior and exterior millwork for commercial and residential applications.</p>
        <br />
    </div>
  )
}

export default Header