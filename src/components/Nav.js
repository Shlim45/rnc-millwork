import Link from 'next/link'
import Image from 'next/image'
import navStyles from '@/styles/Nav.module.css'
import logo from '../../public/rcm-logo.webp'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
        <ul>
            <li><Link href='/'><Image src={logo} alt="RCMillwork Logo" width={50} height={50} /></Link></li>
            <li><Link href='/projects'>Projects</Link></li> {/* Services */}
            <li><Link href='/about'>About</Link></li>
            <li><Link href='/contact'>Contact</Link></li>
            <li><Link href='/quote'>Quote</Link></li>
            <li><span className={ navStyles.phone }>(412) 555-5645</span></li>
        </ul>
    </nav>
  )
}

export default Nav