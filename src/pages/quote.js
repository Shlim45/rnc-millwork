import SandBox from '@/components/SandBox'
import QuoteForm from '@/components/QuoteForm'
import { NextSeo } from 'next-seo';

const quote = () => {
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

            <SandBox heading="Request For Quote">
                <QuoteForm>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="subject">Subject</label>
                    <input type="subject" id="subject" name="subject" placeholder="Type of project" required />

                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" rows="10" placeholder="Describe your project - be as descriptive as possible, please." required></textarea>

                    <button type="submit">Submit</button>
                </QuoteForm>
            </SandBox>
        </>
    )
}

export default quote