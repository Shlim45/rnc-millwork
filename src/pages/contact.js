import SandBox from '@/components/SandBox';
import Link from 'next/link'
import { NextSeo } from 'next-seo';

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
                    Phone: <Link href="tel:412-207-7150">(412) 207-7150</Link></p>

                <Link target="_blank" href="https://www.google.com/maps/place/RC+Custom+Millworks/@40.375231,-80.0094105,17z/data=!4m14!1m7!3m6!1s0x654ad548cd47a71f:0x25f5cc7671714823!2sRC+Custom+Millworks!8m2!3d40.375231!4d-80.0068356!16s%2Fg%2F11svwv9nzk!3m5!1s0x654ad548cd47a71f:0x25f5cc7671714823!8m2!3d40.375231!4d-80.0068356!16s%2Fg%2F11svwv9nzk?entry=ttu">
                    <address>
                        951 Killarney Dr <br />
                        Pittsburgh, PA 15234
                    </address>
                </Link>
            </SandBox>
        </>
    )
}

export default contact;