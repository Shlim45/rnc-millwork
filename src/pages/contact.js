import SandBox from '@/components/SandBox';
import Link from 'next/link'

const contact = () => {
    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh - Contact"
                description="RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services."
                canonical="https://www.rccustommillworks.com/contact/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc custom millworks, rc custom millwork, millworks, rc millwork, rcm, millwork, mill work, kitchen remodel, kitchen renovation, woodworking, custom wood, furniture, kitchen cabinets, custom cabinets, custom kitchen cabinets, table, desk, cabinet, entertainment center, built in, built-in, vanity, vanities, banister, mantelpiece, countertop, counter-top, bar, wet bar, kitchenette, hand-made, hand made, pittsburgh, south hills, north hills, allegheny county, RC Custom Millworks of Pittsburgh, wood shop, quality, pennsylvania'
                    }
                ]}
            />

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
        </>
    )
}

export default contact;