import SandBox from '@/components/SandBox';
import Link from 'next/link'

const contact = () => {
    return (
        <SandBox heading="Contact">
            <p>Contact us today to learn more about how we can help you create the perfect piece for your home or business!</p>
            <p>Email: <Link href="mailto:roetterbill@rccustommillworks.com">RoetterBill@RCCustomMillworks.com</Link>
                <br />
                Phone: (412) 926-2009</p>
            <address>
                951 Killarney Dr <br />
                Pittsburgh, PA 15234
            </address>
        </SandBox>
    )
}

export default contact;