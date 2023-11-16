import styles from '@/styles/Home.module.css'
import SandBox from '@/components/SandBox'
import Slideshow from '@/components/Slideshow'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

const about = () => {

    const shop_slides = [
        "home/RCM_shop",
        "home/shop_left_LS",
        "home/shop_right_1",
        "home/shop_left_PT",
    ];



    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh - About Us"
                description="RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services."
                canonical="https://www.rccustommillworks.com/about/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc custom millworks, rc custom millwork, millworks, rc millwork, rcm, millwork, mill work, kitchen remodel, kitchen renovation, woodworking, custom wood, furniture, kitchen cabinets, custom cabinets, custom kitchen cabinets, table, desk, cabinet, entertainment center, built in, built-in, vanity, vanities, banister, mantelpiece, countertop, counter-top, bar, wet bar, kitchenette, hand-made, hand made, pittsburgh, south hills, north hills, allegheny county, RC Custom Millworks of Pittsburgh, wood shop, quality, pennsylvania'
                    }
                ]}
            />

            <SandBox heading="About Us">
                <p>RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road. Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services.</p>
                <p>We specialize in hand-crafting custom products, including:</p>
                <ul className={styles.list}>
                    <li>Custom kitchen cabinets</li>
                    <li>Tables</li>
                    <li>Banisters</li>
                    <li>Mantelpieces</li>
                    <li>Desks</li>
                    <li>Countertops</li>
                    <li>Entertainment centers</li>
                    <li>Bars</li>
                </ul>
                <p>and much more!  Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price.</p>
                <p>We work closely with our clients to ensure that their vision is brought to life and that they are completely satisfied with the final product.</p>
                <p><Link href="/contact">Contact us</Link> today to learn more about how we can help you create the perfect piece for your home or business!</p>
            </SandBox>

            <section className={styles.shopSlides}>
                <Slideshow images={shop_slides} delay={5000} />
            </section>
        </>

    )
}

export default about